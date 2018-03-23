var redisClient = require('../module/redisClient');
const TIMEOUT_IN_SECONDS = 3600;

module.exports = function(io) {
    var sessionPath = '/temp_sessions';

    // collaboration sessions
    var collaborations = {};

    // map from socketId to sessionId
    var socketIdToSessionId = {};

    io.on('connection', (socket) => {
      //sessionId is the problem number, socket.id is participant's individule id randomly assigned by redis
        let sessionId = socket.handshake.query['sessionId'];

        socketIdToSessionId[socket.id] = sessionId;

        //if a problem is being edited
        if (sessionId in collaborations) {
            //first, join the participants
            collaborations[sessionId]['participants'].push(socket.id);
            //find all the participants and emit userchange
            let participants = collaborations[sessionId]['participants'];
            for (let i = 0; i < participants.length; i++) {
                io.to(participants[i]).emit("userchange", participants);
            }
        } else {
            // not in memory, check in redis
            redisClient.get(sessionPath + '/' + sessionId, function(data) {
                // if data not expired and found
                if (data) {
                    console.log("session terminated previously, get back from redis");
                    // put data into collaborations object as cachedInstructions
                    collaborations[sessionId] = {
                        'cachedInstructions': JSON.parse(data),
                        'participants': []
                    }
                } else {
                    //if not found, just initiate cachedInstructions and set it to empty inside collaborations
                    console.log("creating new session");
                    collaborations[sessionId] = {
                        'cachedInstructions': [],
                        'participants': []
                    }
                }
                // Must put self into collaborations as the first participant.
                collaborations[sessionId]['participants'].push(socket.id);
                io.to(socket.id).emit("userchange", socket.id);
            })
        }

        // socket event listeners
        socket.on('change', delta => {
            console.log("change " + socketIdToSessionId[socket.id] + " " + delta);
            // locate the right session(problem) by mapping socket.id to sesseionid
            let sessionId = socketIdToSessionId[socket.id];
            if (sessionId in collaborations) {
                // first, add change into cachedInstructions
                collaborations[sessionId]['cachedInstructions'].push(["change", delta, Date.now()]);
            }

            if (sessionId in collaborations) {
              // second, find all the participants and emit change in content
                let participants = collaborations[sessionId]['participants'];
                // for debug ==>
                // console.log(collaborations)
                for (let i = 0; i < participants.length; i++) {
                    if (socket.id != participants[i]) {
                        io.to(participants[i]).emit("change", delta);
                    }
                }
            } else {
                console.log("could not tie socket id to any collaboration");
            }
        });

        socket.on('restoreBuffer', () => {
            let sessionId = socketIdToSessionId[socket.id];
            console.log("restore buffer for session" + sessionId, "socket id: " + socket.id);

            // first check if the session in memory
            if (sessionId in collaborations) {
              // get the hisorty instructions
              let instructions = collaborations[sessionId]['cachedInstructions'];
              // emit change event for every history changes
              // so that participants can get the history changes
              for(let i = 0; i < instructions.length; i++) {
                      // instructions[i][0]: change
                      // instructions[i][1]: change value (delta)
                      socket.emit(instructions[i][0], instructions[i][1]);
              }
            } else {
                console.log("could not find any collcation for the session");
            }
        });

        socket.on('disconnect', function() {
            let sessionId = socketIdToSessionId[socket.id];
            console.log("disconnect session" + sessionId, "socket id: " + socket.id);

            let foundAndRemoved = false;

            if (sessionId in collaborations) {
                let participants = collaborations[sessionId]['participants'];

                let index = participants.indexOf(socket.id);
                // if find then remove
                if (index >= 0) {
                   // remove the participants
                    participants.splice(index, 1);
                    foundAndRemoved = true;
                    // then check if this is the last participants
                    if (participants.length == 0) {
                        console.log("last participant in collaboration, committing to redis and remove from memory");
                        let key = sessionPath + "/" + sessionId;
                        // convert JSON object into string
                        let value = JSON.stringify(collaborations[sessionId]['cachedInstructions']);
                        // store into redis
                        redisClient.set(key, value, redisClient.redisPrint);
                        // set expire time
                        redisClient.expire(key, TIMEOUT_IN_SECONDS);

                        delete collaborations[sessionId];
                    }
                }
                // if not the last user, then let the rest user know userchange
                for (let i = 0; i < participants.length; i++) {
                    io.to(participants[i]).emit("userchange", participants);
                }
            }

            //should not hit here, need to debug
            if(!foundAndRemoved) {
                console.log("warning: could not find the socket.id in collaboration");
            }
        })
    })
}

/// collaborations object looks like below:
// restore buffer for session3 socket id: vq85nk7XjnFmoXRGAAAC
// change 3 {"start":{"row":2,"column":36},"end":{"row":2,"column":37},"action":"insert","lines":["a"],"id":2}
// { '3':
//    { cachedInstructions: [ [Object] ],
//      participants: [ 'vq85nk7XjnFmoXRGAAAC' ] } }

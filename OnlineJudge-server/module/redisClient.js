//Since the default the package is not singleton, we want only one instance of Redis in the program so we create a wrapper of Redis. If it is not singleton, we may create too many connections to Redis and it may cause problems.


var redis = require('redis');
//only one client is created
var client = redis.createClient();

function set(key, value, callback) {
  client.set(key, value, function(err, res) {
    if(err) {
      console.log(err);
      return;
    }
    callback(res);
  })
}


function get(key, call) {
  client.get(key, function(err, res) {
    if (err) {
      console.log(err);
      return;
    }
    callback(res);
  })
}


function expire(key, timeInSeconds) {
  client.expire(key, timeInSeconds);
}

function quit() {
  client.quit();
}


module.exports = {
  get: get,
  set: set,
  expire: expire,
  quit: quit,
  redisPrint: redis.print //directly export the function in redis
}

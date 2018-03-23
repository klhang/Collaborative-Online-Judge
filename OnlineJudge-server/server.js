const express = require('express');
const app = express();
const path = require('path');

const http = require('http');

var socketIO = require('socket.io');
var io = socketIO();
var editorSocketService = require('./services/editorSocketService')(io);

const restRouter = require('./routes/rest');

const mongoose = require('mongoose');
mongoose.connect('mongodb://klhang:85201918a@ds229468.mlab.com:29468/test-db')


const root = path.join(__dirname, '../public');
app.use('/api/v1', restRouter);
app.use(express.static(root));

const server = http.createServer(app);
io.attach(server);
server.listen(3000);
server.on('listening', onListening);

function onListening() {
  console.log('App listening on port 3000!')
}

app.use((req, res) => res.sendFile('index.html', {root}));

'use strict';

var express = require('express'); // do not change this line
var socket = require('socket.io'); // do not change this line
var assert = require('assert'); // do not change this line

var server = express();
//
server.use('/', express.static(__dirname + '/'));

var io = socket(server.listen(process.env.PORT || 8080)); // do not change this line

var objectClients = {};

io.on('connection', function(objectSocket) {
  objectSocket.id = Math.random().toString(36).substr(2, 8);
  console.log(objectSocket.id)
  // objectClients[objectSocket.id] = objectSocket;
  // console.log(objectClients);

  objectSocket.emit('hello', {
    'strIdent': objectSocket.id
  });

  objectClients[objectSocket.id] = {
    'id': objectSocket.id,
    'socket': objectSocket
  };

  io.emit('clients', {
    'strClients': Object.keys(objectClients)
  });

  io.emit('message', {
    'strFrom': 'server',
    'strTo': 'everyone',
    'strMessage': objectSocket.id + ' connected'
  });

  // assign a random id to the socket and store the objectSocket in the objectClients variable - example: '9T1P4pUQ'
  // send the new client the 'hello' event, containing the assigned id - example: { 'strIdent':'9T1P4pUQ' }
  // send everyone the 'clients' event, contianing an array of the connected clients - example: { 'objectClients':['GxwYr9Uz','9T1P4pUQ'] }
  // send everyone the 'message' event, containing a message that a new client connected - example: { 'strFrom':'server', 'strTo':'everyone', 'strMessage':'9T1P4pUQ connected' }

  objectSocket.on('message', function(objectData) {
    console.log(objectData);
    // if the message should be recevied by everyone, broadcast it accordingly
    // if the message has a single target, send it to this target as well as to the origin
    objectData['strFrom'] = objectSocket.id;
    if (objectData.strTo === 'everyone') {
      io.emit('message', objectData);
    } else {
      for (var i in objectClients) {
        console.log(objectData.strFrom, objectClients[i].id)
        if (objectData.strTo === objectClients[i].id || objectData.strFrom === objectClients[i].id) {
          objectClients[i].socket.emit('message', objectData);
        }
      }
    }
  });

  objectSocket.on('disconnect', function() {
    // remove the disconnected client from the objectClients variable
    for (var i in objectClients) {
      if (objectClients[i].id === objectSocket.id) {
        delete objectClients[i];
        break;
      }
    }


    // delete objectClients.objectSocket.id;
    // send everyone the 'clients' event, contianing an array of the connected clients - example: { 'objectClients':['GxwYr9Uz'] }
    io.emit('clients', {
      'strClients': Object.keys(objectClients)
    });

    // send everyone the 'message' event, containing a message that an existing client disconnected - example: { 'strFrom':'server', 'strTo':'everyone', 'strMessage':'9T1P4pUQ disconnected' }
    io.emit('message', {
      'strFrom': 'server',
      'strTo': 'everyone',
      'strMessage': objectSocket.id + ' disconnected'
    });
  });
});

console.log('go ahead and open "http://localhost:8080/3-chat.html" in your browser');

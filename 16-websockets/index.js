const express = require('express');
const socket = require('socket.io');

const app = express();

const server = app.listen(5000, () => {
   console.log('Listening to requests on port 5000');
});

//TODO: Serve static files -> find index.html
app.use(express.static('public'));

//TODO: Socket setup (param: the server that we want to work with)
const io = socket(server); 

//TODO: Socket must be in both side => when connection, return a callback
//      with a io at client (their own socket)
io.on('connection', (socket) => {
   console.log('\nMade socket connection ', socket.id);
   // Receive message from client
   socket.on('chat', (data) => {
      io.sockets.emit('chat', data);
   });

   socket.on('typing', (data) => {
      socket.broadcast.emit('typing', data);
   })
});

const {logger} = require("./middleware/logging");
const express = require("express");
const socket = require('socket.io');
const app = express();

require("./startup/routes")(app);
require("./startup/db")();
require("./startup/logging")();
require("./startup/config");
require("./startup/prod")(app);

const port = 2911;

const server = app.listen(process.env.PORT || port, () => {
   logger.info(`Listening on port ${port}`);
});


const io = socket(server);

io.on('connection', (socket) => {
   console.log('\n Made socket connection ', socket.id);
   socket.on('chat', (data) => {
      io.sockets.emit('chat', data);
   })
   socket.on('typing', (data) => {
      socket.broadcast.emit('typing', data);
   })
   socket.on('click', (data) => {
      socket.broadcast.emit('click', data);
   })
});

module.exports = server;

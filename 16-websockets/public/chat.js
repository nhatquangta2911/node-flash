const socket = io.connect('http://localhost:5000');

// Query DOM
var message = document.getElementById('message');
var handle = document.getElementById('handle');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');

// Emit events when click SEND
btn.addEventListener('click', () => {
   socket.emit('chat', {
      message: message.value,
      handle: handle.value
   })
});

message.addEventListener('keypress', () => {
   socket.emit('typing', handle.value);
});

// Listen for events
socket.on('chat', (data) => {
   output.innerHTML += '<p><strong>' + data.handle + '</strong>' + data.message + '</p>';
   feedback.innerHTML = '';
});

socket.on('typing', (data) => {
   feedback.innerHTML = '<p><em><b>' + data + '</b> is typing a message... </em></p>';
});
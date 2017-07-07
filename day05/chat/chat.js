var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/chat.html');
});

io.on('connection', (socket) => {
  socket.broadcast.emit('broadcast');

  socket.on('chat msg', (msg,name) => {
    io.emit('chat msg', msg,name);
  });

  socket.on('ferret', function (fn) {
  fn('woot');
  });

});

http.listen(3000, () => {
  console.log("listening 3000");
});

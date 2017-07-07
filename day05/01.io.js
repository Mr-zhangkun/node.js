var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
server.listen(3000);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log("a user connection!");
  socket.emit('news', {hello: 'world'});
  socket.on('other', (data) => {
    console.log(data);
  });
});

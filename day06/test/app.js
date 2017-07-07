var express = require('express');
var app = express();
var routes = require('./routes/route.js')(app);
app.use(express.static(__dirname + 'public'));
app.get('/one', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
})
app.listen(3000);

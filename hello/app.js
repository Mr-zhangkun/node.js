var http = require("http");
var serv = http.createServer(function(req, res){
  res.writeHead(200, {"content-Type":"text/html"});
  res.end("<h1>Hello Node.js</h1>");
})
serv.listen(3000);

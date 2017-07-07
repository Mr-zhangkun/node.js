var http = require('http');
var serv = http.createServer((req, res) => {
  res.writeHead(200,{'Content-Type': 'text/html'});
  res.end('<h1>hello</h1>');
}).listen(3000);

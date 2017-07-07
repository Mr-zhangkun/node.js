var http = require('http');
var query = require('querystring');
var serv = http.createServer(function(req, res) {
  if ('/' == req.url) {
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    res.end(['<h1>Welcome to Node.js!</h1>',
      '<form method="POST" action="/url">',
      '<fieldset>',
      '<label> Personal information </label>',
      '<p>Name</p>',
      '<input type="text" name="name">',
      '<p>Age</p>',
      '<input type="text" name="age">',
      '<p><button>Submit</button></p>',
      '</form>'
    ].join(' '));
  } else if ('/url' == req.url && 'POST' == req.method) {
    var name = '';
    var ms;
    req.on('data', function(chunk) {
      name += chunk;
      ms = query.parse(name);
    });

    req.on('end', function() {
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      res.end(['Your sent a <em>' + req.method + '</em> request',
        '<p>Data: ' + ms.name + '</p>',
        '<p>Age: ' + ms.age + '</p>'
      ].join(' '));
    });
  } else {
    res.writeHead(404);
    res.end('Not found.')
  }
}).listen(3000);

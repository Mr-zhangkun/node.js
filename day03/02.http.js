var http = require('http');
var serv = http.createServer((req, res) => {
  console.log(req.method);
  if (req.url === '/') {
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    res.end(['<h1>Welcome to Node.js!</h1>',
      '<form method="POST" action="/url">',
      '<fieldset>',
      '<lable> Persinal information </label>',
      '<p>Name</p>',
      '<input type="text" name="name">',
      '<p>Age</p>',
      '<input type="text" name="age">',
      '<p><button>Submit</button></p>',
      '</form>'
    ].join(' '));
  } else if (req.url === '/url' && req.method === 'POST') {
    var name = '';
    req.on('data', (nam) => {
      name += nam;
    });
    req.on('end', () => {
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      res.end(['your sent a <em>' + req.method + '</em> request',
        '<p>Data:' + name + '</p>'
      ].join(' '));
    });
  } else {
    res.writeHead(404, {
      'Content-Type': 'text/html'
    });
    res.end('<h1>false</h1>');
  }
}).listen(3000);

var http = require('http');
var fs = require('fs');
var query = require('querystring');

var user;
var pw;
var serv = http.createServer((req, res) => {
  if ('/' === req.url) {
    var name = '';
    var ms;
    req.on('data', function(chunk) {
      name += chunk;
      ms = query.parse(name);
      user = ms.name;
      pw = ms.password;
    });
    fs.readFile('./index.html', (err, file) => {
      if (err) {
        res.write('404');
        res.end();
      } else {
        res.writeHead(200, {
          'Content-Type': 'text/html'
        });
        res.end(file);
      }
    })
  } else if ('/url' == req.url && 'POST' == req.method) {
    var name1 = '';
    var ms1;
    req.on('data', function(chunk) {
      name1 += chunk;
      ms1 = query.parse(name1);
      console.log(ms1.name);

    if(user === ms1.name && pw === ms1.password){

    req.on('end', function() {
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      res.end(['Your sent a <em>' + req.method + '</em> request',
        '<p>Data: ' + ms1.name + '</p>',
        '<p>password: ' + ms1.password + '</p>'
      ].join(' '));
    });
  }else{
    req.on('end', function() {
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      res.end(['<h1>error</h1>'
      ].join(' '));
    });
  }
});
}
  else if (req.url === '/login') {
    fs.readFile('./login.html', (err, file) => {
      if (err) {
        res.write('404');
        res.end();
      } else {
        res.writeHead(200, {
          'Content-Type': 'text/html'
        });
        res.end(file);
      }
    })
  }else if(req.url === '/log1'){
    var name = '';
    var ms;
    req.on('data', function(chunk) {
      name += chunk;
      ms = query.parse(name);
      user = ms.name;
      pw = ms.password;
    });
    req.on('end', function() {
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      res.end(['OK',
        '<p>Data: ' + ms.name + '</p>',
        '<p>password: ' + ms.password + '</p>'
      ].join(' '));
    });
  }
  else if (req.url === '/find') {
    fs.readFile('./find.html', (err, file) => {
      if (err) {
        res.write('404');
        res.end();
      } else {
        res.writeHead(200, {
          'Content-Type': 'text/html'
        });
        res.end(file);
      }
    })
  } else {
    res.writeHead(404);
    res.end('Not found.')
  }
})
serv.listen(3000);

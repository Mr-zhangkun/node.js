var http = require('http');
var fs = require('fs');
var query = require('querystring');
var mongoclient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/zk';

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

      //将注册的账号密码写入数据库
      mongoclient.connect(url, (err, db) => {
        assert.equal(err, null);
        var myInsert = (db, callback) => {
          db.collection('mycol').insertOne({
            'name': user,
            'password': pw
          });
          callback()
        }
        myInsert(db, () => {
          db.close()
        });
      })
    });

    //读登录页面
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
      user = ms1.name;
    });
      req.on('end', function() {
        res.writeHead(200, {
          'Content-Type': 'text/html'
        });
        //连接数据库查看该账号的密码
        mongoclient.connect(url, function(err, db) {
          assert.equal(null, err);
          var show = db.collection('mycol').find({
            "name": user
          });
          show.each((err, doc) => {
            assert.equal(err, null);
            if (doc !== null) {
              pw = doc.password;
            } else {
              db.close();
            }
            //判断账号密码是否正确
            if (pw === ms1.password) {
              res.end(['Your sent a <em>' + req.method + '</em> request',
                '<p>Data: ' + ms1.name + '</p>',
                '<p>password: ' + ms1.password + '</p>'
              ].join(' '));
            } else {
              res.end(['<h1>error</h1>'].join(' '));
            };
          });
        });
    });
  } else if (req.url === '/login') {
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
  } else if (req.url === '/log1') {
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
  } else if (req.url === '/find') {
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

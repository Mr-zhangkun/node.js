var app = require('express')();
var http = require('http').Server(app);


app.set('view engine', 'ejs');
app.set('views', __dirname+'/views');

var io = require('socket.io')(http);

var bodyParser = require('body-parser');
app.use(bodyParser.json({
  limit: '1mb'
}));
app.use(bodyParser.urlencoded({
  extended: true
}));

var username, pw;

var nameA;

var mongoclient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/zk';

app.get('/index', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
})

app.post('/one', (req, res) => {
  let msg = req.body;
  mongoclient.connect(url, (err, db) => {
    assert.equal(err, null);
    var show = db.collection('mycol').find({
      "account": msg.name
    });
    show.each((err, doc) => {
      if(doc){

        res.sendFile(__dirname + '/public/error.html');

        db.close()
        return -1;
      }
      else{

      var myInsert = (db, callback) => {
        db.collection('mycol').insertOne({
          'account': msg.name,
          'password': msg.password,
          'name': msg.tel
        });
        callback()
      }
      myInsert(db, () => {
        db.close()
      });
    res.sendFile(__dirname + '/public/succes.html');
    }
  })

  })
});
//////////////////////////////////////////
app.post('/two', (req, res) => {
  let msg = req.body;
  mongoclient.connect(url, (err, db) => {
    assert.equal(err, null);

      var upDate = (db, callback) => {
        db.collection('mycol').update(
          {'account': msg.name}, {$set: {
            'password': msg.password}},false,true)
        callback()
      }
      upDate(db, () => {
        db.close()
      })

    res.sendFile(__dirname + '/public/index.html');
  })
});






app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
})

app.get('/find', (req, res) => {
  res.sendFile(__dirname + '/public/find.html');
})

app.post('/url', (req, res) => {
  let user = req.body.account;
  let pw1 = req.body.password;


  mongoclient.connect(url, function(err, db) {
    assert.equal(null, err);
    var show = db.collection('mycol').find({
      "account": user
    });
    show.each((err, doc) => {
      assert.equal(err, null);
      if (doc !== null) {
        pw = doc.password;
        nameA = doc.name;

      } else {
        db.close();
      }
      //判断账号密码是否正确
      if (pw === pw1) {
        res.sendFile(__dirname + '/public/chat.html');


      } else {
        res.sendFile(__dirname + '/public/error-login.html');

        // res.end(['<h1>Account or password error, please login again!</h1>'].join(' '));
      };
    });
  });
})

io.on('connection', (socket) => {
  socket.broadcast.emit('broadcast',nameA);
  const nameC = nameA;
  console.log(nameA);
  console.log(nameC );
  socket.on('chat msg', (msg) => {
    io.emit('chat msg', msg,nameC);
  });

  socket.on('ferret', function(fn) {
    fn('woot');
  });

});

http.listen(3000, () => {
  console.log("listening 3000");
});

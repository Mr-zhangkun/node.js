var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/zk';

var show = (db, callback) => {
  var cursor = db.collection('mycol').find();
  cursor.each((err, doc) => {
    assert.equal(err, null);
    if(doc !== null){
      callback(doc);
    }
  })
};


MongoClient.connect(url, function(err, db){
  assert.equal(null, err);

  console.log('Connected correctly to server.');

  show(db, (doc) => {
    console.dir(doc);
    db.close();
  });

});

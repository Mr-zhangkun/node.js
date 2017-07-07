var mongoclient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/zk';

mongoclient.connect(url, (err, db) => {
  assert.equal(err,null);

  var myInsert = (db,callback) => {
    db.collection('mycol').insertOne({
      'name':12345,
      'password': 'zk123456'
    });
    callback()
  }
  myInsert(db,() => {db.close()});
})

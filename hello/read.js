var fs = require("fs");
fs.readFile('./text.md', function(err, data){
  if(err){
    console.log(err);
  }else{
    console.log(data);
  }
});


console.log("file read end.");

var data = 'asdf';
fs.writeFile('./text.md',data, function(err){
  if(err){
    console.log(err);
  }
});

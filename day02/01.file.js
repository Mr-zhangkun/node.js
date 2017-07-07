var fs = require("fs");
fs.readFile('./text.md', function(data){

    console.log(data);
  
});


console.log("file read end.");

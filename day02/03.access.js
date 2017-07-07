var fs = require('fs');
fs.access('./node', fs.constants.F_OK,(err) =>
{
  // console.log(err);
  // console.log(err?'no':'yes')
  if(err){
    fs.mkdir('./node',fs.constants.W_OK,(err) =>{
      console.log(err);
    })
  }else{
    fs.rmdir('./node',fs.constants.W_OK,(err) =>{
      console.log(err);
    })
  }
});

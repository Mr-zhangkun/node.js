var fs = require('fs');

var data = 'asdf';
fs.writeFile('./text.md',data, function(err){
  if(err){
    console.log(err);
  }
});

data = 'qwer';
try{
fs.writeFileSync('./text.md', data, 'utf8');
}catch(err){
  console.log(err);
}

var fs = require('fs');
var data = fs.readFileSync('./text.md', 'utf8');

console.log('file read start');
console.log(data);
console.log('file read end');

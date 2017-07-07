var fs = require('fs');
fs.stat('./node', (err, stats) => {
  if (err) {
    console.log(err);
  }
  console.log(stats);
})

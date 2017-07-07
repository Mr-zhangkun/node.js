var fs = require('fs');
var buffer = new Buffer(10);

//fs.readFile(path[, options], callback)
// let fs.readFile = (path, options, )


fs.open('./text.md', 'r+', (err, fd) => {
  if (err) console.log(err);
  fs.read(fd, buffer, 0, 10, 3, (err, bytesRead, buffer) => {
    if (err) {
      console.log(er);
      fs.close(fd, (err) => {
        if (err) {
          console.log(err);
          return -1;
        }
        return 0;
      })
    }
    console.log(bytesRead);
    console.log(buffer);
    fs.close(fd, (err) => {
      if (err) console.log(err);
      return 0;
    });
  });
});

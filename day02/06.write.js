var fs = require('fs');

fs.open('./text.md', 'w', (err, fd) => {
  if (err) {
    console.log(err);
    return -1;
  }

  fs.write(fd, '2222222222', (err, bytesWrite, buffer) => {
    if (err) {
      console.log(err);
      return -1;
    }
    console.log(bytesWrite);
    console.log(buffer);

    fs.close(fd, (err) => {
      if (err) console.log(err);
    });
  });
});

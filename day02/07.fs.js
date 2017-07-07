var fs = require('fs');
//读文件
fs.readFile('./text.md', (err, data) => {
  if (err) console.log(err);
  console.log(data);
});
console.log('readFile end.');

//写文件
fs.writeFile('./text.md', 'zhangkun', (err) => {
  if (err) console.log(err);
});

//文件是否存在,存在则删除，不存在则创建。
fs.access('./node', (err) => {
  if (err) {
    console.log(err);
    fs.mkdir('./node', (err) => {
      if (err) console.log(err);
    });
  } else {
    fs.rmdir('./node', (err) => {
      if (err) console.log(err);
    });
  }
});

//读取文件具体信息
fs.stat('./text.md', (err, stats) => {
  if (err) console.log(err);
  console.log(stats);
});

//实现文件的读
let buffer = new Buffer(10);
fs.open('./text.md', 'r', (err, fd) => {
  if (err) {
    console.log(err);
    return -1;
  }
  fs.read(fd, buffer, 0, 10, 2, (err, bytesRead, buffer) => {
    if (err) {
      console.log(err);
      fs.close(fd, (err) => {
        if (err) {
          console.log(err);
          return -1;
        }
      })
      return -1;
    } else {
      console.log(bytesRead);
      console.log(buffer);
      fs.close(fd, (err) => {
        if (err) console.log(err);
        return 0;
      });
    }
  });
});

//实现文件的写
fs.open('./text.md', 'w', (err, fd) => {
  if (err) {
    console.log(err);
    return -1;
  }
  fs.write(fd, 'zhangzhangzhang', (err, written, string) => {
    if (err) {
      console.log(err);
      fs.close(fd, (err) => {
        if (err) {
          console.log(err);
          return -1;
        }
      });
    } else {
      console.log(written);
      console.log(string);
      fs.close(fd, (err) => {
        if (err) console.log(err);
        return 0;
      });
    }
  });
});

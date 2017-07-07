{
  var a = 9;
  let b = 0;
  console.log(a, b);
}
// console.log(a, b);　　　let 只在一个代码块里有用，常用在for循环ｉi

var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function() {
    console.log(i);
  };
}
a[6]();//10
for(let i = 0; i < 10; i++){
  a[i] = function(){console.log(i);}
}
a[6]();//6

// console.log(q);//error let没有变量声明提升。
let q = 10;

var num = 123;
if(true){
  // console.log(num); //error 如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。--------------暂时性死区。
  let num;
}
console.log('-------------------------');
typeof y;
// typeof x; //error;  死区
let x;

// function bar(x = y, y = 2){
//   return [x, y];
// }
// bar();

var c = c;
// let d = d;//error

let h = 1;
// let h = 3;//error  let不许重复声明同一个变量

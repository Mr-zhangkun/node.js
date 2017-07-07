var tmp = new Date();
function f(){
  console.log(tmp);
  if(false){
    var tmp = 'hello world';//变量声明提升
  }
}
f();//undefined　被覆盖

function f1(){
  let n = 5;
  if(true){
    let n = 10;
  }
  console.log(n);
}
f1();

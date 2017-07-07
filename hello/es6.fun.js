var f = v => v;

var f = () => 10;

var f = (a, b) => a + b;

var f = (a, b) => {return a + b};

var f = (id) => ({'id':id, name:'lisi'});//返回对象，外面加括号

var f = (...num) => num;//返回数组

var f = (head, ...num) => [head, num];//[ 2, [ 3, 4, 5, 6 ] ]

console.log(f(2,3,4,5,6));

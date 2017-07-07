var EventEmitter = require('events').EventEmitter;
var event = new EventEmitter();

var fun = function(){
  console.log('event--1');
}

function fun1(){
  console.log('event----1');
}

event.on('event1', fun);
event.on('event1', fun1);

event.on('event2', function(a){
  console.log(a);
  console.log('event--2');
});

event.addListener('event2', fun1);
event.removeListener('event1',fun);

// event.removeAllListeners();

setTimeout(function(){
  event.emit('event1');
  event.emit('event2','qwer');
}, 1000);

var cc = event.setMaxListeners(1);
console.log(cc);
console.log('-------------');
var bb = event.listeners('event1');
console.log(bb);

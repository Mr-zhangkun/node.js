var name;

exports.setName = (myname) => {
  name = myname;
};

exports.nameHello = () => {
  console.log("hello---" + name);
};

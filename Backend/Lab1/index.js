import EventEmmiter from "node:events";

const myEmmiter = new EventEmmiter();

myEmmiter.on("greet", (teacher) => {

  console.log('class started by ${teacher}');

});

myEmmiter.on("exit", (teacher) => {

  console.log('class finished by ${teacher}');

});

myEmmiter.emit("greet", "chandrahas");

myEmmiter.emit("exit", "chandrahas");
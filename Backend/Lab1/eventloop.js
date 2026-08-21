console.log("This is the starting point of my code");
process.nextTick(() => {
  console.log("This process.nextTick operations");
})
setTimeout(() => {
  console.log("This is first timeout operation");
},0);
console.log("This is the ending point of my code");
setTimeout(() => {
  console.log("This is second timeout operation");
},0);
new Promise ((resolve, reject) => {
  let succes = true;
  if(succes){
    resolve("Data resolve successfully");
  } else {
    reject("Data loading failed");
  }
}).then((message) => {
  console.log(message);
}).catch((message) => {
  console.log(message);
});
console.log("This is starting point of my code");
console.log("This is the end point of my code");
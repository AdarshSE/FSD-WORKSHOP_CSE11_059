//javascriopt is a single threaded language, and event driven with synchronous(single) operations.
//event loop is used for asynchronous(multiple) operations.
//DOM elements are used to create the event driven architecture in javascript.
//button is a DOM element which we are creating to work in browser.
import {EventEmitter }from "node:events"

function createDomElements() {
    const emitter=new EventEmitter();
    return {
        addEventListener(eventType,listener){
            emitter.on(eventType,listener);
        },
        removeEventListener(eventType,listener){
            emitter.off(eventType,listener);
        },
        dispatchEvent(event){
            event.target=this;
            event.currentTarget=this;
            emitter.emit(event.eventType,event);
        }
    }
}
const button=createDomElements();
button.addEventListener('save', ()=>{
    console.log("saving...");
})
button.addEventListener('submit',()=>{
    console.log("Data submitted successfully");
})
function handleClick(event){
    console.log("mouse clicked");
    console.log(event.eventType);
    console.log(`message: ${event.detail}`);
}
button.addEventListener('click', (event)=>{
    console.log("mouse clicked");
    console.log(event.eventType);
    console.log(`message: ${event.detail}`);
});
button.addEventListener('click', handleClick);
button.dispatchEvent({
  eventType:"save"
});
button.dispatchEvent({
  eventType:"submit"
});
button.dispatchEvent({
eventType:"click",
detail: "this is the click dispatcher"
});
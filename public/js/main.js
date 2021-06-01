const msg1 = document.querySelector(".msg-1");
const msg2 = document.querySelector(".msg-2");

console.log("hello");
setTimeout(() => msg1.remove(), 3000);
setTimeout(() => msg2.remove(), 3000);

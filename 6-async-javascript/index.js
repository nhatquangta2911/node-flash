console.log('Before');

// After the first line executed 
// the program is blocking, the second line has to wait
// until the first line finish execution

// When we call this function, this function is schedule a task to be performed in the future.
setTimeout(() => {
   console.log('Reading a user from a database...');
}, 2000);

console.group("After");
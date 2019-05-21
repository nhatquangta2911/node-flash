console.log('Before');

// After the first line executed 
// the program is blocking, the second line has to wait
// until the first line finish execution

// When we call this function, this function is schedule a task to be performed in the future.
setTimeout(() => {
   console.log('Reading a user from a database...');
}, 2000);

console.group("After");

/*

ASYNC: dealing 

   1. user input
   2. request database from db (involved network access) or file system (involved disk)
   3. Send data across the network + Wait for a response
   4. Perform a repeated task

*/
const promise = new Promise((resolve, reject) => {
   // Kick off some async work
   // Access a DB, Call a web server, Start a timer...
   // ...
   // Eventually, all async work done
   // We have values (fulfilled state) or an error (rejected state)
   setTimeout(() => {
      console.log("Waiting for a timer...");
      // resolve(1);
      reject(new Error('message'));
   }, 3000);
   // Best practice: passing an error into an object
   // reject(new Error("message"));
});

promise 
   .then(data => console.log(data))
   .catch(err => console.log(err.message));
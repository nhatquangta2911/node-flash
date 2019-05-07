const getUser = (id, callback) => {
   setTimeout(() => {
      console.log("Getting a user from a database...");
      callback({
         id: id,
         githubUsername: "Ryan"
      });
   }, 2000);
};

const getRepositories = (userName, callback) => {
   setTimeout(() => {
      console.log("Reading repositories from a user...");
      callback([
         { id: 1, name: "JS" },
         { id: 2, name: "Java" },
         { id: 3, name: "Python" }
      ]);
   }, 2000);
};

console.log('First');
getUser(3, user => {
   getRepositories(user, repos => {
      console.log(user);
      console.log(repos);
   });
});
console.log('Last');
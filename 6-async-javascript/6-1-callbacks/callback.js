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

const getBranches = (repoId, callback) => {
   setTimeout(() => {
      console.log('Reading branches from a repository...');
      callback([
         {id: 1, name: "master"},
         {id: 2, name: "develop"},
         {id: 3, name: "release"},
         {id: 4, name: "bugfix"}
      ])
   }, 2000);
}

const displayBranches = branches => {
   console.log(branches);
}

console.log('First');
getUser(3, user => {
   getRepositories(user.githubUsername, repos => {
      getBranches(repos[0].Id, displayBranches);
   });
});
console.log('Last');  
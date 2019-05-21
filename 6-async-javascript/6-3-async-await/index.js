const getUser = id => {
   return new Promise((resolve, reject) => {
      //Kick off some async work
      setTimeout(() => {
         console.log("Reading a user from a database...");
         resolve({ id: 1, githubUsername: "Ryan" });
      }, 2000);
   });
};

const getRepositories = userId => {
   return new Promise((resolve, reject) => {
      setTimeout(() => {
         console.log("Reading repositories from a user...");
         // resolve([
         //    { id: 1, name: "JS" },
         //    { id: 2, name: "Java" },
         //    { id: 3, name: "Python" }
         // ]);
         reject(new Error('Could not get the repository'));
      }, 2000);
   });
};

const getBranches = repoId => {
   return new Promise((resolve, reject) => {
      setTimeout(() => {
         console.log("Reading branches from a repository...");
         resolve([
            { id: 1, name: "master" },
            { id: 2, name: "hotfix" },
            { id: 3, name: "develop" },
            { id: 4, name: "feature" }
         ]);
         reject(new Error("error message"));
      }, 2000);
   });
};

console.log("Before");

//TODO: Promise-based approach
// getUser(1)
//    .then(user => getRepositories(user.githubUsername))
//    .then(repos => getBranches(repos[2].id))
//    .then(branches => console.log(...branches))
//    .catch(err => console.log(err.message));

//TODO: Async and await approach

async function displayBranches() {
   try {
      const user = await getUser(1);
      const repos = await getRepositories(user.githubUsername);
      const branches = await getBranches(repos[0].id);
      console.log(branches);
   } 
   catch (err) {
      console.log(err);
   }
}

displayBranches();

console.log("After");

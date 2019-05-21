console.log("Before");

getUser(3)
   .then(user => getRepositories(user.githubUsername)
   .then(repos => console.log(repos)));

console.log("After");

function getUser(id) {
   return new Promise((resolve, reject) => {
      // Kick off some async work
      setTimeout(() => {
         console.log("Reading a user from a database...");
         resolve({
            id: id,
            githubUsername: "ryan"
         });
      }, 2000);
   });
}

function getRepositories(username) {
   return new Promise((resolve, reject) => {
      setTimeout(() => {
         console.log("Reading repositories of", username.githubUsername);
         resolve(["repo1", "repo2", "repo3", "repo4"]);
      }, 3000);
   });
}

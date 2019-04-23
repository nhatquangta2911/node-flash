console.log('Before');

getUser(1, (user) => {
   console.log('User: ', user);
   getRepositories(user, (repositories) => {
      console.log('Repositories: ', repositories);
   });
});

console.log('After');

function getUser(id, callback) {
   setTimeout(() => {
      console.log('Reading a user from a database...');
      callback(
         {
            id: id,
            githubUsername: 'ryan'
         }
      );
   }, 2000);
}

function getRepositories(username, callback) {
   setTimeout(() => {
      console.log('Reading repositories of', username.githubUsername);
      callback(
         [
            'repo1',
            'repo2',
            'repo3',
            'repo4',
         ]
      )
   }, 3000);
}
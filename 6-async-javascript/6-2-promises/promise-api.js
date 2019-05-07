// static method called resolve() 
// which returning a promise that was already resolved or rejected
const resolvedPromise = Promise.resolve({ id: 1, name: 'Ryan' });
resolvedPromise.then(user => console.log(user));

const rejectedPromise = Promise.reject(new Error('error message'));
rejectedPromise.catch(err => console.log(err.message));

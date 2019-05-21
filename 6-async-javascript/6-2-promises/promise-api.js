// settled promises
// static method called resolve() 
// which returning a promise that was already resolved or rejected
const resolvedPromise = Promise.resolve({ id: 1, name: 'Ryan' });
resolvedPromise.then(user => console.log(user));

const rejectedPromise = Promise.reject(new Error('error message'));
rejectedPromise.catch(err => console.log(err.message));

// parallel promises

const promiseFb = new Promise((resolve, reject) => {
   setTimeout(() => {
      console.log('Get Fb account information...');
      resolve({ id: 1, name: 'Ryan', age: 22 });
   }, 1000);
})

const promiseMelOn = new Promise((resolve, reject) => {
   setTimeout(() => {
      console.log('Get MelOn account information...');
      reject(new Error('Oop!'));
      // resolve({ id: 230929, name: 'Ryan', isVipAccount: false });
   }, 2000);
})

const promiseHanteo = new Promise((resolve, reject) => {
   setTimeout(() => {
      console.log('Get Hanteo account information...');
      resolve({ id: 58992, name: 'Ryan', isVipAccount: true });
   }, 3000);
})

Promise.all([promiseFb, promiseMelOn, promiseHanteo])
   .then(result => console.log(result))
   .catch(err => console.log(err.message ));

// Promise.race([promiseFb, promiseMelOn, promiseHanteo])
//    .then(result => console.log(result))
//    .catch(err => console.log(err.message ));

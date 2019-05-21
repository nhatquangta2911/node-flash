/*

TODO: 3 ways to clone an bject
TODO: 1. for in
TODO: 2. Object.assign()
TODO: 3. Spread Operator

*/
   const group = {
      name: 'OMG',
      debutYear: 2015,
      peakMelon: 2,
      singDemo() {
         console.log('Singing CLOSER');
      }
   }

//TODO: 1
   const anotherGroup = {};

   for(let key in group) {
      anotherGroup[key] = group[key];
   }

   console.log(anotherGroup);

//TODO: 2 (even used for combining 2 or more objects into one)
   const yetAnotherGroup = Object.assign({ isDisband: true }, group);
   console.log(yetAnotherGroup);

   const combinedGroup = Object.assign({group}, {anotherGroup});
   console.log(combinedGroup);

//TODO: 3 (Spread operator)

   const yetYetAnotherGroup = { ...group, trophies: 24};
   console.log(yetYetAnotherGroup);
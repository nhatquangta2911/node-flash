
//TODO: Primitives are copied by their value
//TODO: Objects are copied by their reference (actually an address)

// 1
let objectA = {
   value: 'A',
   render() {
      console.log(this.value);
   }
}

let objectB = objectA;

objectB.value = 'B';

// Both objectA and objectB are changed
objectA.render()
objectB.render();

// 2

let number = 10;

function increase(number) {
   number++;
}

//TODO: (Premitives) Pass an object by its value - independent
increase(number);

console.log(number);

// 3 

let numberObject = {
   value: 100
};

const increaseObject = (number) => {
   number.value++;
};

//TODO: (References) Pass an object by its reference
increaseObject(numberObject);
console.log(numberObject);

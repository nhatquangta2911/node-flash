const _ = require('underscore');

const colors = ['red', 'blue', 'yellow', 'pink'];

const checkColor = (color) => {
   return _.contains(colors, color);
}

console.log(checkColor('blue'));
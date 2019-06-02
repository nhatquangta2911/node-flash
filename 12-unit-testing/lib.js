//TODO: TESTING NUMBERS
module.exports.absolute = (number) => {
   // if(number > 0) return number;
   // if(number < 0) return -number;
   // return 0;
   //TODO: REFACTOR WITH CONFIDENCE (Change impl) 
   // if(number >= 0) return number;
   // return -number;
   return (number >= 0) ? number : -number;
}

module.exports.floating = (number1, number2) => {
   return number1 + number2;
}

module.exports.greet = (name) => {
   return `Welcome ${name} to my website!`;
}
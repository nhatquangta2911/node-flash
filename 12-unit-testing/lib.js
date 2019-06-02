//TODO: TESTING NUMBERS
module.exports.absolute = (number) => {
   if(number > 0) return number;
   if(number < 0) return -number;
   return 0;
}

module.exports.floating = (number1, number2) => {
   return number1 + number2;
}
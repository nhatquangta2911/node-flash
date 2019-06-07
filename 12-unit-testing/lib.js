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

module.exports.getColors = () => {
   return ['GREEN', 'CYAN', 'ORANGE', 'RED'];
}

module.exports.getAlbum = (albumId) => {
   return { id: albumId, price: 23, name: 'The Fifth Season' };
}

module.exports.registerUser = (username) => {
   if(!username) throw new Error('Username is required.');
   return {
      id: new Date().getTime(), 
      username: username
   } 
}
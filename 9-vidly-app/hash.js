const bcrypt = require("bcrypt");

const run = async () => {
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash('1234', salt);
   console.log(hashedPassword);
};

run();
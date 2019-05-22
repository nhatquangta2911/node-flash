const mongoose = require('mongoose');

mongoose
   .connect('mongodb://localhost/data-validation-section', {
      useNewUrlParser: true,
      useFindAndModify: false
   })
   .then(() => console.log('Connected'))
   .catch(err => console.error('Something went wrong! ', err));

const StuffSchema = new mongoose.Schema({
   name: String,
   label: String,
   price: Number,
   tags: [ String ],
   isExpired: Boolean
});

const Stuff = mongoose.model('stuffs', StuffSchema);

const sampleStuff = {
   name: 'Heat Preservation Water Bottle',
   label: 'LOCK N LOCK',
   price: 11.28,
   tags: ['Convenience', 'Effective'],
   isExpired: false
}

const expiredSampleStuff = {
   name: 'Gel Pen',
   label: 'STALKER',
   price: 2.34,
   tags: ['Study', 'Effective'],
   isExpired: true
}

const createStuff = async () => {
   const stuff = new Stuff(sampleStuff);
   const result = await stuff.save();
   console.log(result);
}

const getStuffs = async () => {
   const stuffs = await Stuff
      .find({
         isExpired: false
      });
   console.log(stuffs);
}

// createStuff();
getStuffs();
const mongoose = require('mongoose');

mongoose
   .connect('mongodb://localhost/data-validation-section', {
      useNewUrlParser: true,
      useFindAndModify: false
   })
   .then(() => console.log('Connected'))
   .catch(err => console.error('Something went wrong! ', err));

const StuffSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      // match: /pattern/,

   },
   category: {
      type: String,
      required: true,
      enum: ['Book', 'Pen', 'Bottle']
   },
   label: String,
   price: {
      type: Number,
      required: function () {
         return !this.isExpired
      },
      min: 1,
      max: 30 
   },
   tags: {
      type: Array,
      validate: {
         validator: function (value) {
            return value && value.length > 0
         },
         message: 'A stuff should have at least one tag!'
      }
   },
   isExpired: Boolean
});

const Stuff = mongoose.model('stuffs', StuffSchema);

const sampleStuff = {
   name: 'Heat Preservation Water Bottle 2063',
   label: 'LOCK N LOCK',
   category: 'Pen',
   price: 29.28,
   tags: ['Bottle'],
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
   try {
      const result = await stuff.save();
      console.log(result);
      // await stuff.validate();
   } catch (ex) {
      console.log(ex.message);
   }
}

const getStuffs = async () => {
   const stuffs = await Stuff
      .find({
         isExpired: false
      });
   console.log(stuffs);
}

const getExpensiveStuffs = async () => {
   const expensiveStuff = await Stuff
      .find({
         price: {
            $gte: 5
         }
      })
      .sort('-price')
      .select('name label price');
   console.log(expensiveStuff);
}

const getStuffWithPagination = async (pageNumber, pageSize) => {
   const stuffs = await Stuff
      .find()
      .skip((pageNumber - 1) * pageSize)
      .sort("-price")
      .limit(pageSize)
      .select("name label price");
   console.log(stuffs);
}

createStuff();
// getStuffs();
// getExpensiveStuffs();
// getStuffWithPagination(2, 3);
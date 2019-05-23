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
   //TODO: SchemaType Options
   label: {
      type: String,
      lowercase: true,
      trim: true
   },
   price: {
      type: Number,
      required: function () {
         return !this.isExpired
      },
      min: 1,
      max: 30,
      get: value => Math.round(value),
      set: value => Math.round(value),
   },
   tags: {
      type: Array,
      validate: {
         isAsync: true,
         validator: function (value, callback) {
            setTimeout(() => {
               // Do some async work
               const result = value && value.length > 0;
               callback(result);
            }, 3000);
         },
         message: 'A stuff should have at least one tag!'
      }
   },
   isExpired: Boolean,
   isExpensive: {
      type: Boolean,
      required: function() {
         return !(this.price > 20);
      }
   }
});

const Stuff = mongoose.model('stuffs', StuffSchema);

const sampleStuff = {
   name: 'Heat Preservation Water Bottle',
   label: '    LOCK N LOCK                      ',
   category: 'Pen',
   price: 19.88,
   tags: ['Effective'],
   isExpired: false,
   isExpensive: true
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
      //TODO: errors property
      for(field in ex.errors) {
         console.log(ex.errors[field].message);
      }
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

const getStuffWithRounding = async (id) => {
   const stuff = await Stuff
      .find({ _id: id })
      .select('name price');
   console.log(stuff[0].price * 1000);
}

// createStuff();
// getStuffs();
// getExpensiveStuffs();
// getStuffWithPagination(2, 3);
getStuffWithRounding("5ce4c210d240450e00622821");
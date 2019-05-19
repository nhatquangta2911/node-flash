const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises', { useNewUrlParser: true })
   .then(() => console.log('Connected!'))
   .catch(err => console.error('Something went wrong! ', err));

const courseSchema = mongoose.Schema({
   name: String,
   author: String,
   isPublished: Boolean,
   price: Number,
   tags: [ String ],
   date: { type: Date, default: Date.now }
});

const Course = mongoose.model('courses', courseSchema);

async function getCourses() {
   return await Course
      .find({
         isPublished: true
      })
      .or([
         { price: {$gte: 15} },
         { name: /.*by.*/gi }
      ])
      .sort('-price')
      .select('name author price');
}

async function displayCourses() {
   const courses = await getCourses();
   console.log(courses);
}

displayCourses();
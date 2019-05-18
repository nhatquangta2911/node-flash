 const mongoose = require('mongoose');

 mongoose
   .connect('mongodb://localhost/mongo-exercises', {useNewUrlParser: true})
   .then(() => console.log('Connected!'))
   .catch(err => console.error('Something went wrong!', err));

const courseSchema = new mongoose.Schema({
   name: String,
   author: String,
   tags: [String],
   price: Number,
   date: {type: Date, default: Date.now},
   isPublished: Boolean
});

const Course = mongoose.model('courses', courseSchema);

async function getCourses() {
   return await Course
      .find({
         isPublished: true,
         // tags: {$in: ['backend', 'frontend']}
      })
      .or([
         {tags: 'backend'},
         {tags: 'frontend'}
      ])
      .sort({price: -1})
      .select('name author price');
}

async function display() {
   const courses = await getCourses();
   console.log(courses);
}

display();
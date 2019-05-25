const mongoose = require('mongoose');

mongoose
   .connect('mongodb://localhost:27017/modelling-relationship-demo', {
      useNewUrlParser: true,
      useFindAndModify: false
   })
   .then(() => console.log('Connected'))
   .catch(err => console.error('Something went wrong! ', err));

const Author = mongoose.model('Author', new mongoose.Schema({
   name: String,
   bio: String,
   website: String
}));

const Course = mongoose.model('Course', new mongoose.Schema({
   name: String,
   author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Author' //TODO: Collection name
   }
}));

const createAuthor = async (name, bio, website) => {
   const author = new Author({
      name: name,
      bio: bio,
      website: website
   });
   const result = await author.save();
   console.log(result);
};

const createCourse = async (name, author) => {
   const course = new Course({
      name: name,
      author: author
   });
   const result = await course.save();
   console.log(result);
};

const displayCourses = async () => {
   const courses = await Course  
      .find()
      .sort('-name')
      .populate('author', 'name -_id')
      .populate('category', 'name -_id')
      .select('name author');
   console.log(courses);
};

// createAuthor('Ryan', 'Nothing to show', 'ryan.com');
// createCourse('React From Scratch', '5ce8b4d2ca63683318c5a640');
displayCourses();
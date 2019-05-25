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
   },
   categories: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
   }]
}));

const Category = mongoose.model('Category', new mongoose.Schema({
   name: String
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

const createCourse = async (name, author, categories) => {
   const course = new Course({
      name: name,
      author: author,
      categories: categories
   });
   const result = await course.save();
   console.log(result);
};

const createCategory = async (name) => {
   const category = new Category({
      name: name
   });
   const result = await category.save();
   console.log(result);
};

const displayCourse = async (id) => {
   const courses = await Course
      .findOne({ _id: id })
      .sort('-name')
      .populate('author', 'name -_id')
      .populate({
         path: 'categories',
         select: 'name -_id',
         populate: {
            path: 'categories',
            model: 'Category',
         }
      })
      .select('name author categories');
   console.log(courses);
};

// createAuthor('Ryan', 'Nothing to show', 'ryan.com');
// createCategory('frontend');
// createCourse('React Tricks', '5ce8b4d2ca63683318c5a640', ["5ce8b7b47edcf11a08e06ba4", "5ce8b7de8cbd4a2a001c7478"]);
displayCourse('5ce8b93fba901d2450b46dae');
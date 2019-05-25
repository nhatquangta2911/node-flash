const mongoose = require('mongoose');

mongoose
   .connect('mongodb://localhost:27017/modelling-relationship-demo', {
      useNewUrlParser: true,
      useFindAndModify: false
   })
   .then(() => console.log('Connected'))
   .catch(err => console.error('Something went wrong! ', err));

const authorSchema = new mongoose.Schema({
   name: String,
   bio: String,
   website: String
});
const Author = mongoose.model('Author', authorSchema);

const categorySchema = new mongoose.Schema({
   name: String
});
const Category = mongoose.model('Category', categorySchema);

const Course = mongoose.model('Course', new mongoose.Schema({
   name: String,
   author: authorSchema,
   categories: [categorySchema]
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
      .findOne({
         _id: id
      })
      .sort('-name')
      // .populate('author', 'name -_id')
      // .populate({
      //    path: 'categories',
      //    select: 'name -_id',
      //    populate: {
      //       path: 'categories',
      //       model: 'Category',
      //    }
      // })
      .select('name author categories.name');
   console.log(courses);
};

const addCategory = async (courseId, category) => {
   const course = await Course.findById(courseId);
   course.categories.push(category);
   const result = await course.save();
   console.log(result);
}

const removeCategory = async (courseId, categoryId) => {
   const course = await Course.findById(courseId);
   const category = course.categories.id(categoryId);
   category.remove();
   const result = await course.save();
   console.log(result);
}

const removeNullCategory = async (courseId) => {
   const course = await Course.findById(courseId);
   course && course.categories && course.categories[1] && course.categories[1].remove();
   const result = await course.save();
   console.log(result);
}


// createAuthor('Ryan', 'Nothing to show', 'ryan.com');
// createCategory('softskill');
// createCourse('Node 10', new Author({name: 'Ryan'}), [new Category({name: 'A'}), new Category({ name: 'B'})]);
// displayCourse('5ce8c94ea2ceb513b87efb4b');
// addCategory('5ce8c94ea2ceb513b87efb4b', new Category({name: 'C'}));
// removeCategory('5ce8c94ea2ceb513b87efb4b', '5ce8cbc71c32261c043ed279');
removeNullCategory('5ce8c94ea2ceb513b87efb4b');
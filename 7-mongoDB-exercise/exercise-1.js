const mongoose = require("mongoose");

mongoose
   .connect("mongodb://localhost/mongo-exercises", {
      useNewUrlParser: true
   })
   .then(() => console.log("Connected"))
   .catch(err => console.error("Something wrong!", err));

const courseSchema = new mongoose.Schema({
   name: String,
   author: String,
   price: Number,
   date: {
      type: Date,
      default: Date.now
   },
   tags: [String],
   isPublished: Boolean
});

const Course = mongoose.model("courses", courseSchema);

async function getCourses() {
   return await Course.find({
         isPublished: true,
         tags: "Test"
      })
      .sort({
         name: 1
      })
      .select({
         name: 1,
         author: 1
      });
}

const createCourse = async () => {
   const course = new Course({
      name: "Test",
      author: "Test",
      price: 30,
      tags: ["Test", "Gulp"],
      isPublished: true
   });
   const result = await course.save();
   console.log(result);
}

const updateCourse = async (id) => {
   const course = await Course.findByIdAndUpdate(
      id, {
         $set: {
            author: "오마이걸",
            price: 30
         }
      },
      { new: true }
   );
   console.log(course);
}

const deleteCourse = async (id) => {
   const result = await Course.deleteOne({
      _id: id
   });
   console.log(result);
}

async function run() {
   const courses = await getCourses();
   console.log(courses);
}



// createCourse();
// run();
updateCourse("5ce37ff79d2c9c1ef0f5755d");
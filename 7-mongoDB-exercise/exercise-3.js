const mongoose = require("mongoose");

mongoose
   .connect("mongodb://localhost/mongo-exercises", {
      useNewUrlParser: true,
      useFindAndModify: false
   })
   .then(() => console.log("Connected!"))
   .catch(err => console.error("Something went wrong! ", err));

const courseSchema = mongoose.Schema({
   name: String,
   author: String,
   isPublished: Boolean,
   price: Number,
   tags: [String],
   date: { type: Date, default: Date.now }
});

const exampleCourse = {
   name: "Bullet Journal Course by Ryan",
   author: "Ryan",
   isPublished: true,
   price: 24,
   tags: ["effective", "study"]
};

const Course = mongoose.model("courses", courseSchema);

async function createCourse() {
   const course = new Course(exampleCourse);
   const result = await course.save();
   console.log(result);
}

async function getCourses() {
   return await Course.find({
      isPublished: true
   })
      .or([{ price: { $gte: 15 } }, { name: /.*by.*/gi }])
      .sort("-price")
      .select("name author price");
}

async function displayCourses() {
   const courses = await getCourses();
   console.log(courses);
}

//TODO: Query fisrt
async function updateCourseByQueryingFirst(id) {
   const course = await Course.findById(id);
   if (!course) return;

   course.isPublished = false;
   course.author = "Anonymous";

   const result = await course.save();
   console.log(result);
}

//TODO: Update first (directly)
async function updateCourseByUpdatingFirst(id) {
   const result = await Course.update(
      { _id: id },
      {
         $set: {
            author: "오마이걸",
            price: 29
         }
      }
   );
   console.log(result);
}

//TODO: In case you want to update document and retreive it back
async function updateCourseByUpdatingFirstAndRetrieve(id) {
   const course = await Course.findByIdAndUpdate(
      id,
      { $inc: { price: 1 } },
      { new: true }
   );
   console.log(course);
}

// createCourse();
// displayCourses();
// updateCourseByQueryingFirst('5ce0c9b81e105823bce60d77');
// updateCourseByUpdatingFirst('5ce0c9b81e105823bce60d77');
updateCourseByUpdatingFirstAndRetrieve("5ce0c9b81e105823bce60d77");

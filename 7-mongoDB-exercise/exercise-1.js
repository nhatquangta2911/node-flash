const mongoose = require("mongoose");

mongoose
   .connect("mongodb://localhost/mongo-exercises", { useNewUrlParser: true })
   .then(() => console.log("Connected"))
   .catch(err => console.error("Something wrong!", err));

const courseSchema = new mongoose.Schema({
   name: String,
   author: String,
   price: Number,
   date: { type: Date, default: Date.now },
   tags: [String],
   isPublished: Boolean
});

const Course = mongoose.model("courses", courseSchema);

async function getCourses() {
   return await Course.find({ isPublished: true, tags: ["node", "backend"] })
      .sort({ name: 1 })
      .select({ name: 1, author: 1 });
}

async function run() {
   const courses = await getCourses();
   console.log(courses);
}

run();

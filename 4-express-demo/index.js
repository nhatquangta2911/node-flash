// require() shoutld be always on top of the module
const Joi = require("joi");
const express = require("express");
const app = express();

// adding a piece of middleware
// app.use => use this middleware ...
app.use(express.json());

// Resources
const courses = [
   {
      id: 1,
      name: "Node Core"
   },
   {
      id: 2,
      name: "Node Package Module"
   },
   {
      id: 3,
      name: "Express"
   },
   {
      id: 4,
      name: "MongoDB"
   }
];

// GET methods
app.get("/", (req, res) => {
   res.send("Hello world!");
});

app.get("/api/customers", (req, res) => {
   res.send("Customers");
});

app.get("/api/posts", (req, res) => {
   res.send("Posts");
});

app.get("/api/posts/:id", (req, res) => {
   res.send(req.params.id);
});

app.get("/api/posts/:year/:month", (req, res) => {
   res.send(req.query);
});

app.get("/api/courses", (req, res) => {
   res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
   // res.send(courses[req.params.id]);
   const course = courses.find(course => course.id === parseInt(req.params.id));

   if (!course)
      return res.status(404).send("The course with the given ID was not found");

   res.send(course);
});

// POST Method
app.post("/api/courses", (req, res) => {
   const { error } = validateCourse(req.body);

   if (error) return res.status(400).send(error.details[0].message);

   const course = {
      id: courses.length + 1,
      name: req.body.name
   };
   courses.push(course);
   res.send(courses);
});

// PUT method (update route)
app.put("/api/courses/:id", (req, res) => {
   // 1. Look up the courses
   const course = courses.find(course => course.id === parseInt(req.params.id));
   // 2. If not existing, return 404
   if (!course)
      return res.status(404).send("The course with the given ID was not found");

   const { error } = validateCourse(req.body);

   if (error) return res.status(400).send(error.details[0].message);

   // 5. Update courses
   course.name = req.body.name;
   // 6. Return the updated course to client
   res.send(course);
});

// DELETE method
app.delete("/api/courses/:id", (req, res) => {
   // 1. Look up the course
   const course = courses.find(course => course.id === parseInt(req.params.id));
   // 2. 404 ?
   if (!course) return res.status(404).send("Not found");
   // 3. Delete
   // courses.pop(course);
   const index = courses.indexOf(course);
   courses.splice(index, 1);
   // 4. Return the same course (convention)
   res.send(course);
});

// Validation function
const validateCourse = course => {
   // 3. Otherwise, Validate
   const schema = {
      name: Joi.string()
         .regex(/^[a-z]{3,20}$/i)
         .required()
   };
   // 4. If invalid, return 400 - Bad request
   return Joi.validate(course, schema);
};

const port = process.env.PORT || 3000;

app.listen(port, () => {
   console.log(`Listening on port ${port}...`);
});

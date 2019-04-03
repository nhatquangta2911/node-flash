const Joi = require('joi');
const express = require("express");
const app = express();

// adding a piece of middleware
// app.use => use this middleware ...
app.use(express.json());

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

// GET method

app.get("/api/courses", (req, res) => {
   res.send(courses);
});
 
app.get("/api/courses/:id", (req, res) => {
   // res.send(courses[req.params.id]);
   const course = courses.find(course => course.id === parseInt(req.params.id));
   if (!course) {
      res.status(404).send("The course with the given ID was not found");
   } else {
      res.send(course);
   }
});

// Post Method
app.post("/api/courses", (req, res) => {
   
   const schema = {
      name: Joi.string().regex(/^[a-z]{3,}$/i).required()
   };

   const result = Joi.validate(req.body, schema);
   console.log(result);
   
   if(result.error) {
      res.status(400).send(result.error);
      return;
   }
   const course = {
      id: courses.length + 1,
      name: req.body.name
   };
   courses.push(course);
   res.send(courses);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
   console.log(`Listening on port ${port}...`);
});

const express = require("express");
const Joi = require("joi");

const app = express();
app.use(express.json());

// Resources
const genres = [
   {
      id: 1,
      name: "Horror"
   },
   {
      id: 2,
      name: "Cartoon"
   },
   {
      id: 3,
      name: "Fiction"
   }
];

// GET methods
app.get("/", (req, res) => {
   res.send("Home Page");
});

app.get("/api/genres", (req, res) => {
   res.send(genres);
});

app.get("/api/genres/:id", (req, res) => {
   const genre = genres.find(g => g.id === parseInt(req.params.id));
   if (!genre) return res.status(404).send("Not found");
   res.send(genre);
});

// POST method
app.post("/api/genres", (req, res) => {
   const { error } = validateGenre(req.body);
   if (error) return res.status(400).send(error.details[0].message);
   const genre = {
      id: genres.length + 1,
      name: req.body.name
   };
   genres.push(genre);
   res.send(genres);
});

// PUT method
app.put("/api/genres/:id", (req, res) => {
   const genre = genres.find(g => g.id === parseInt(req.params.id));
   if (!genre) return res.status(404).send("Not found");

   const { error } = validateGenre(req.body);
   if (error) return res.status(400).send(error.details[0].message);

   genre.name = req.body.name;
   res.send(genre);
});

// DELETE method
app.delete('/api/genres/:id', (req, res) => {
   
   const genre = genres.find(g => g.id === parseInt(req.params.id));
   if(!genre) return res.status(404).send('Not found');

   const index = genres.indexOf(genre);
   genres.splice(index, 1);

   res.send(genre);
});

// Validate function
const validateGenre = genre => {
   const schema = {
      name: Joi.string()
         .regex(/^[a-z]{3,15}$/i)
         .required()
   };
   return Joi.validate(genre, schema);
};

// Listen on the given port
const port = process.env.PORT || 3000;

app.listen(port, () => {
   console.log(`Listening on port ${port}...`);
});

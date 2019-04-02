const express = require('express');
const app = express();

app.get('/', (req, res) => {
   res.send('Hello world!');
});

app.get('/api/customers', (req, res) => {
   res.send('Customers');
});

app.get('/api/posts', (req, res) => {
   res.send('Posts');
});

app.get('/api/posts/:id', (req, res) => {
   res.send(req.params.id);
});

app.get('/api/posts/:year/:month', (req, res) => {
   res.send(req.query);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
   console.log(`Listening on port ${port}...`);
});
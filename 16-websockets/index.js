const express = require('express');
const app = express();

const server = app.listen(5000, () => {
   console.log('Listening to requests on port 5000');
});

//TODO: Serve static files -> find index.html
app.use(express.static('public'));
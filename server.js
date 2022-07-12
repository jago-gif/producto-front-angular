
const path = require('path');
const express = require('express');
const app = express();

// Serve static files
app.use(express.static('./dist/CLIENTE'));

// Send all requests to index.html
app.get('/*', function(req, res) {
  res.sendFile('index.html',{root:'./dist/CLIENTE/'});
});

// default Heroku port
app.listen(process.env.PORT || 5000);
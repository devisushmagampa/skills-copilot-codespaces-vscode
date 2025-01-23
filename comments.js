// Create web server
// Start server
// Get request
// Read comments from file
// Send comments to client
// Post request
// Read comments from file
// Add new comment
// Write comments to file
// Send comments to client

const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/comments', (req, res) => {
  fs.readFile('comments.json', (err, data) => {
    if (err) {
      res.status(500).send('Server error');
    } else {
      res.send(data);
    }
  });
});

app.post('/comments', (req, res) => {
  fs.readFile('comments.json', (err, data) => {
    if (err) {
      res.status(500).send('Server error');
    } else {
      const comments = JSON.parse(data);
      comments.push(req.body);
      fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
        if (err) {
          res.status(500).send('Server error');
        } else {
          res.send('Success');
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
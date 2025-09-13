const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use('/', express.static('public'));

const budgetPath = path.join(__dirname, 'budget.json');


app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

app.get('/budget', (req, res) => {
  fs.readFile(budgetPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to load budget.json' });
    }
    res.json(JSON.parse(data));
  });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
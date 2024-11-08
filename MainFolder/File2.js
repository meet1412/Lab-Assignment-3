const express = require('express');
const app = express();

const data = require('../data/data.json');

app.get('/cars', (req, res) => {
  res.json(data); 
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/cars`);
});

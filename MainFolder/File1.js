const express = require('express');
const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
    res.send('<h1>Team Members</h1><p><ul><li>Member1 - Meet Patel</li><li>Member2 - Harsh Parekh</li></ul></p>');
});
  
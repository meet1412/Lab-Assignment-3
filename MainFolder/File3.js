const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());

const dataPath = path.join(__dirname, '../data/data.json');

const readData = () => {
  try {
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading data file:", err);
    return [];
  }
};

const writeData = (data) => {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error writing data file:", err);
  }
};

// GET - Retrieve all cars info
app.get('/cars', (req, res) => {
  const cars = readData();
  res.json(cars);
});

// POST - Add a new car data
app.post('/cars', (req, res) => {
  const cars = readData();
  const newCar = { id: "7", ...req.body };
  cars.push(newCar);  
  writeData(cars);
  res.status(201).json(newCar);
});

// PUT - Update data
app.put('/cars/:id', (req, res) => {
  const cars = readData();
  const carIndex = cars.findIndex(car => car.id == req.params.id);

  if (carIndex === -1) {
    return res.status(404).send('Car not found');
  }

  cars[carIndex] = { ...cars[carIndex], ...req.body };
  writeData(cars);
  res.json(cars[carIndex]);
});

// DELETE Data
app.delete('/cars/:id', (req, res) => {
  let cars = readData();
  const initialLength = cars.length;
  cars = cars.filter(car => car.id != req.params.id);

  if (cars.length === initialLength) {
    return res.status(404).send('Car not found');
  }

  writeData(cars);
  res.status(204).send();
});

// To start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/cars`);
});

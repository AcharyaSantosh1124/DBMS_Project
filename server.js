const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Configure your ElephantSQL database connection details
const pool = new Pool({
  connectionString: 'postgres://pilfwhom:3K5-YOgulcfyff6iv1-Zsr1COUu6yku9@stampy.db.elephantsql.com/pilfwhom'
});

app.use(express.json());

// Enable CORS for all routes
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Define a route to handle the database update
app.post('/update', (req, res) => {
  const { name, roll, age, address, score } = req.body;

  const query = 'INSERT INTO input(Name, Roll, Age, Address, Entrance_Score) VALUES ($1, $2, $3, $4, $5)';
  const values = [name, roll, age, address, score];

  pool.query(query, values, (err, result) => {
    if (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'An error occurred while updating the data' });
    } else {
      res.json({ success: true });
    }
  });
});

// Define a route to fetch the student data from the database
app.get("/students", (req, res) => {
  const query = "SELECT * FROM input";

  pool.query(query, (err, result) => {
    if (err) {
      console.error("Error executing query", err);
      res.status(500).json({ error: "An error occurred while fetching student data" });
    } else {
      res.json(result.rows);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

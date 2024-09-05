const express = require('express');
const cors = require('cors');
const wsaroutes = require('./src/wsa/routes'); 
const pool = require('./database'); // Adjust the path as necessary

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use('/api/v1/wsa', wsaroutes);

// Route to serve log data from the database
app.get('/logs', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, timestamp, ST_AsText(location) as location, men_count, women_count FROM GenderDistributionLog');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching logs:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
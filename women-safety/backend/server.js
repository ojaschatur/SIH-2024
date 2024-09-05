const express = require('express');
const wsaroutes = require('./src/wsa/routes'); 
const app = express();
const port = 3000;

app.use(express.json());

/*app.get('/', (req, res) => {
    res.send('Hello World!');
})*/

app.use('/api/v1/wsa', wsaroutes);

app.listen(port, () => console.log(`Server is running on port ${port}`));

const express = require("express");
const cors = require("cors");

// Enable CORS for all requests
app.use(cors());

app.get("/api/v1/wsa", (req, res) => {
  // Example route
  res.json({ message: "CORS is enabled!" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


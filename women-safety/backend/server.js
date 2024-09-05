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

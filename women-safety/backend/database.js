const Pool = require("pg").Pool;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',          
  database: 'wsa',  
  password: 'mI09?7jhwn04',  
  port: 5432,                  
});

module.exports = pool;

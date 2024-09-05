const pool = require('../../database.js');
const queries = require('./queries.js');
const getLogs = (req, res) => {
    pool.query(queries.getLogs, (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
};

const addLogs = (req, res) => {
    const { timestamp, location, men_count, women_count } = req.body;

    // Checking if the same timestamp and location already exist
    pool.query(queries.checkdataexists, [timestamp, location], (error, results) => {
        if (error) {
            console.error('Error checking data:', error);
            return res.status(500).json(error);
        }

        if (results.rows.length) {
            // If data exists, send a message indicating that
            return res.status(409).json({ message: 'Data with the same timestamp and location already exists.' });
        } else {
            // If data does not exist, insert the new log entry
            const insertQuery = `
                INSERT INTO genderdistributionlog (timestamp, location, men_count, women_count)
                VALUES ($1, $2, $3, $4)
                RETURNING *;
            `;

            pool.query(insertQuery, [timestamp, location, men_count, women_count], (error, results) => {
                if (error) {
                    console.error('Error inserting data:', error);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }

                // Send the newly inserted log entry as a response
                return res.status(201).json(results.rows[0]);
            });
        }
    });
};



module.exports = {
    getLogs,addLogs
};
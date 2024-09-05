const getLogs = "SELECT * FROM genderdistributionlog";
const checkdataexists= " SELECT 1 FROM genderdistributionlog WHERE timestamp = $1 AND location = $2"

module.exports = {
    getLogs,checkdataexists
} 
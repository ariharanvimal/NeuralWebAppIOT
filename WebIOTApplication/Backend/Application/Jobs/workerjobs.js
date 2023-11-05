const cron = require('node-cron');
const dbsqloperation = require('../DataBase Operation/DB_SQL_operation');
const scheduledJob = () => cron.schedule('23 16 * * *', () => {
    dbsqloperation.selectAllDatatoJSON();

}).start();

module.exports = {
    scheduledJob
}


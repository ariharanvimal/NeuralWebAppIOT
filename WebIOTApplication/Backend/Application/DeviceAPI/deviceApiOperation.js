const { getID } = require("../DataBase Operation/DB_SQL_operation")

function getDeviceID(MAC) {
    return getID(MAC)
}

module.exports = {
    getDeviceID
}
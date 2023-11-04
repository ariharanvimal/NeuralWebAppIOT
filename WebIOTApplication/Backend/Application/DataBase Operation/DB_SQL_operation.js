const sqlite3 = require("sqlite3").verbose();
const environment = require("../Environment/environment");
let dbsql;
// connect to SQL DB
const sqldb = () => {
    dbsql = new sqlite3.Database(environment.sqldatabase.dbName, (err) => {
        if (err) {
            console.log(err.message);
        }
        console.log(
            "Connected to the " + environment.sqldatabase.dbName + " SQlite database."
        );
    });
    try {
        dbsql.serialize(function () {
            // Create a table if it doesn't exist
            dbsql.run(`
        CREATE TABLE IF NOT EXISTS Devices (
        id INTEGER PRIMARY KEY,
        deviceMAC TEXT NOT NULL,
        configState BOOLEAN DEFAULT 0,
        deviceID TEXT DEFAULT "",
        pinConfig BOOLEAN DEFAULT 0 ) `);
            // Add more table creation statements as needed

            console.log("Table created (if not already existing).");
        });
    } catch (error) {
        console.log("this is," + error);
    }
};

//insert record into the table

const insertRecord = () => {
    const insertquery = "INSERT INTO Devices (deviceMAC, configState, deviceID, pinConfig) VALUES('your_device_mac_value', 0, '', 0);"
    dbsql.run(insertquery, function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log(`A row has been inserted with rowid ${this.lastID}`)
        }
    })
}

//select all data from the table

const selectAllDataFromTable = () => {
    dbsql.all('SELECT * FROM Devices', [], (err, rows) => {
        if (err) {
            console.error('Error executing SELECT query:', err.message);
        } else {
            // Process the retrieved data
            console.log(rows)
            rows.forEach(row => {
                console.log(row);
            });
        }

        // Close the database connection
        dbsql.close();
    });
}

//select all table form the database
const selectAllTable = () => {
    dbsql.all(
        "SELECT name FROM sqlite_master WHERE type='table';",
        [],
        function (err, tables) {
            if (err) {
                return console.error(err.message);
            }
            console.log("Tables in the database:");
            tables.forEach(function (table) {
                console.log(table.name);
            });
        }
    );
}

const dropTable = () => {
    try {
        dbsql.run("DROP TABLE IF EXISTS Devices", function (err) {
            if (err) {
                return console.error("Error dropping table:", err.message);
            }
            console.log("Devices table dropped (if it exists).");
        });
    } catch (error) { }
};

module.exports = {
    sqldb,
    dropTable,
    selectAllTable,
    insertRecord,
    selectAllDataFromTable
};

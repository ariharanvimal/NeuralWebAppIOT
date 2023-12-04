const sqlite3 = require("sqlite3").verbose();
const environment = require("../Environment/environment");
const { setName } = require("../common/common");
const firebaseoperation = require("./FirebaseOpreations");
const fs = require("fs");
const path = require("path");

let dbsql;
// connect to SQL DB
const sqldb = () => {
    // crate the DB
    try {
        dbsql = new sqlite3.Database(environment.sqldatabase.dbName, (err) => {
            if (err) {
                console.log(err.message);
            }
            console.log(
                "Connected to the " +
                environment.sqldatabase.dbName +
                " SQlite database."
            );
        });
    } catch (error) {
        console.log(error);
    }
    //create the tables
    try {
        dbsql.serialize(function () {
            const create = "CREATE TABLE IF NOT EXISTS ";
            environment.sqldatabase.tables.forEach((table) => {
                const query = create + table.tableName + table.schema;
                dbsql.run(query);
                console.log("Table created " + table.tableName);
            });
        });
    } catch (error) {
        console.log("this is," + error);
    }
};

//get the Deviceid with MAC
async function getID(mac) {
    return new Promise((resolve, reject) => {
        const query = "SELECT deviceID FROM Devices WHERE deviceMAC = " + mac;
        dbsql.all(query, [], (err, rows) => {
            if (err) {
                reject(err);
            }
            if (rows && rows.length > 0) {
                resolve(rows[0].deviceID);
            } else {
                resolve(0);
            }
        });
    });
}
//log the action to database
function loggerdb(data) {
    const query = "INSERT INTO neorLog (type, data) VALUES (?,?)";
    const jsonstring = JSON.stringify(data);
    dbsql.run(query, [data.type, jsonstring], (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`A new user has been inserted with ID ${this.lastID}`);
        }
    });
}

//Insert record into the table
const insertSensorRecord = (temp, hum) => {
    console.log(temp, hum);
    const insertquery =
        "INSERT INTO SensorData (temperature, humidity) VALUES(?,?)";
    dbsql.run(insertquery, [temp, hum], function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log(`A row has been inserted with rowid ${this.lastID}`);
        }
    });
};

//insert record into the table
async function insertRecord(request) {
    return new Promise((resolve, reject) => {
        try {
            if (request.type && request.type === "addnewdevice") {
                const insertquery =
                    "INSERT INTO Devices (deviceMAC, configState, deviceID, pinConfig) VALUES(?,?,?,?);";
                dbsql.run(insertquery, [request.deviceMAC, 0, "", 0], function (err) {
                    if (err) {
                        reject(false)
                    } else {
                        resolve(true)
                    }
                });
            }
        } catch (error) {
            reject(error)
        }
    }).catch(error => {
        console.log(error)
    })
}

//get Unconfigured devices
async function getUCdevices() {
    return new Promise((resolve, reject) => {
        try {
            dbsql.all("SELECT * FROM Devices WHERE configState = 0", [], (err, data) => {
                if (err) {
                    reject(err)
                }
                else {
                    console.log(data)
                    if (data && data.length > 0) {
                        resolve(data)
                    }
                    else {
                        resolve(0)
                    }
                }
            });
        } catch (error) {
            reject(error)
        }

    }).catch(error => {
        reject(error)
    })
}

//get Unconfigured pin devices
async function getUPCdevices() {
    return new Promise((resolve, reject) => {
        try {
            dbsql.all("SELECT * FROM Devices WHERE pinConfig = 0 AND configState = 1", [], (err, data) => {
                if (err) {
                    reject(err)
                }
                else {
                    console.log(data)
                    if (data && data.length > 0) {
                        resolve(data)
                    }
                    else {
                        resolve(0)
                    }
                }
            });
        } catch (error) {
            reject(error)
        }

    }).catch(error => {
        reject(error)
    })
}

//set pin configuration
async function setPinconfiguration(data) {
    return new Promise((resolve, reject) => {
        try {
            // console.log(data)
            const query = "SELECT COUNT(*) AS count FROM Deviceconfig WHERE deviceID = ?"
            dbsql.run(query, [data.deviceID], (err, data) => {
                if (err) {
                    reject(err)
                }
                else {
                    console.log(data)
                    if (data && data.length > 0) {
                        const jsonstring = JSON.stringify(data.topic);
                        const updatequery = 'INSERT INTO Deviceconfig (deviceID, topics) VALUES(?, ?)'
                        dbsql.run(insertquery, [data.deviceID, jsonstring], (err, data) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(1)
                            }

                        })
                    }
                    else {
                        resolve(0)
                    }
                }
            });
            resolve(1)
        } catch (error) {
            reject(error)
        }
    }).catch(error => {
        reject(error)
    })
}

//set device name
async function setDeviceName(mac) {
    return new Promise((resolve, reject) => {
        try {
            const countquery = "SELECT COUNT(*) AS count FROM Devices WHERE configState = 1"
            dbsql.get(countquery, (err, row) => {
                if (err) {
                    reject(err)
                } else {
                    if (row) {
                        const newDevID = setName(row.count + 1)
                        console.log(newDevID)
                        const updatequery = "UPDATE Devices SET deviceID = ?, configState = ? WHERE deviceMAC = ?";
                        dbsql.run(updatequery, [newDevID, 1, mac], function (err) {
                            if (err) {
                                reject(err)
                            }
                            else {
                                console.log("Updated deviceID and configState for deviceMAC:", mac);
                                const devconfigquery = "INSERT INTO Deviceconfig (deviceID) VALUES(?);";
                                dbsql.run(devconfigquery, [newDevID], (err) => {
                                    if (err) {
                                        reject(err)
                                    }
                                    else {
                                        resolve(1)
                                    }
                                })

                                selectAllDataFromTable()
                            }
                        })
                    }
                    else {
                        resolve(0)
                    }
                }
            })
        } catch (error) {
            reject(error)
        }

    }).catch(error => {

    })
}

//update the valuee in the table
async function updateRecord(request) {
    return new Promise((resolve, reject) => {


    }).catch(error => {
        console.log(error)
    })
}

//select all data from the table
const selectAllDataFromTable = () => {
    dbsql.all("SELECT * FROM Deviceconfig", [], (err, rows) => {
        if (err) {
            console.error("Error executing SELECT query:", err.message);
        } else {
            // Process the retrieved data
            console.log(rows);
            rows.forEach((row) => {
                console.log(row);
            });
        }

        // Close the database connection
        // dbsql.close();
    });
};
//select all data from the table to json
const selectAllDatatoJSON = () => {
    dbsql.all("SELECT * FROM SensorData", [], (err, rows) => {
        if (err) {
            console.error("Error executing SELECT query:", err.message);
        } else {
            const jsonData = JSON.stringify(rows, null, 2);
            const dirpath = "SQLjson";
            const filepath = path.join(__dirname, dirpath);
            console.log(__dirname);
            if (!fs.existsSync(filepath)) {
                fs.mkdirSync(filepath, { recursive: true }); // recursive option creates parent directories as needed
            }
            console.log("filepath", filepath);
            fs.writeFileSync(path.join(filepath, "sample.json"), jsonData);
            // firebaseoperation.uploadJSON(jsonData);
        }

        // Close the database connection
        // dbsql.close();
    });
};

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
};

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
    updateRecord,
    insertSensorRecord,
    selectAllDataFromTable,
    selectAllDatatoJSON,
    getUCdevices,
    getUPCdevices,
    setDeviceName,
    setPinconfiguration,
    getID,
    loggerdb,
};

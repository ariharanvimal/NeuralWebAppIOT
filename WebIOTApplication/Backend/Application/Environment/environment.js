const application = {
    PORT: 5000
}
const dataBase = {
    url: "mongodb://localhost:27017/",
    NeuralOrganics: "NeuralOrganicsiot",
}

const sqldatabase = {
    dbName: 'NeuralOrganicsIOT.db',
    tables: [
        {
            tableName: 'IOTSensordata ',
            schema: '( id INTEGER PRIMARY KEY, deviceMAC TEXT , DeviceID TEXT ,water_temp REAL, TDS TEXT, pH REAL, DO REAL, RL BOOLEAN, type TEXT DEFAULT "sensordata")'
        },
        {
            tableName: 'Devices',
            schema: '( id INTEGER PRIMARY KEY, deviceMAC TEXT UNIQUE NOT NULL, configState BOOLEAN DEFAULT 0,deviceID TEXT DEFAULT "", pinConfig BOOLEAN DEFAULT 0, type TEXT DEFAULT "devicedata")'
        },
        {
            tableName: 'DeviceControls ',
            schema: '( id INTEGER PRIMARY KEY, deviceMAC TEXT, topic TEXT, value TEXT , type TEXT DEFAULT "devicecontrols")'
        },
        {
            tableName: 'Deviceconfig ',
            schema: '( id INTEGER PRIMARY KEY, deviceID TEXT, topics TEXT DEFAULT "" , type TEXT DEFAULT "deviceconfig")'
        },
        {
            tableName: 'neorLog ',
            schema: '( id INTEGER PRIMARY KEY, type TEXT, data TEXT,timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)'
        }
    ]
}

const encryptionanddecryption = {
    SECRETE_KEY: "N3U5AL056AN16S",
    IV: "@N305",
    CODE: "NEOR",
    CON: "UC"
}

module.exports = {
    application, dataBase, sqldatabase, encryptionanddecryption
}

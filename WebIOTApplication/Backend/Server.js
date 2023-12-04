const express = require("express")
const app = express()
const cors = require('cors')
const dboperations = require("./Application/DataBase Operation/DB_operation")
const sqldboperation = require("./Application/DataBase Operation/DB_SQL_operation")
const { router } = require("./Application/Router/route")
const firebaseoperation = require("./Application/DataBase Operation/FirebaseOpreations")
const { scheduledJob } = require("./Application/Jobs/workerjobs")
const MqttHandler = require("./Application/MQTT/mqtthandler")
const mqtthandler = new MqttHandler()


// mongo Db
// dboperations.connectToDatabase();
//sql Db
sqldboperation.sqldb();
// sqldboperation.selectAllTable()
// sqldboperation.insertRecord();
// sqldboperation.selectAllDataFromTable();
// sqldboperation.selectAllDatatoJSON();

//firebase Db
// firebaseoperation.initializeFirebase();

//jobs
// scheduledJob();

//mqtt Handler
// mqtthandler.connect();
//middleware
app.use(express.json())
app.use(cors())
app.use("/", router)
//Start the server
app.listen(4000, () => {
    console.log("Server Started...")
})
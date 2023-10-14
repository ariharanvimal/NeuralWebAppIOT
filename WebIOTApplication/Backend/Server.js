const express = require("express")
const app = express()
const cors = require('cors')
const dboperations = require("./Application/DataBase Operation/DB_operation")
const { router } = require("./Application/Router/route")

dboperations.connectToDatabase();

//middleware
app.use(express.json())
app.use(cors())
app.use("/", router)
//Start the server
app.listen(4000, () => {
    console.log("Server Started...")
})
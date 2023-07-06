const express = require("express")
const { Config, allDevices } = require("./Constant data/deviceData")
const app = express()
const cors = require('cors')

//middleware
app.use(express.json())
app.use(cors())


//listen for the confdevice page
app.post("/deviceConfigs", (req, res) => {
    console.log("got the req")
    res.json({ "types": Config.types })
})
//listen for the allldevice page
app.get("/alldevices", (req, res) => {
    console.log("got the all req")
    res.json({ allDevices })
})
//listen for the device - ID page
app.post("/devwithid", (req, res) => {
    console.log("all the best")
    const { devid } = req.body
    let result = allDevices.filter(dev => dev.devid === devid)
    res.json({ data: result[0] })
})

//Start the server
app.listen(4000, () => {
    console.log("Server Started...")
})
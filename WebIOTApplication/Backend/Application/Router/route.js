const dbsqloperaiotn = require("../DataBase Operation/DB_SQL_operation");
const { getDeviceID } = require("../DeviceAPI/deviceApiOperation");
const cryptoperation = require("../ENDcrypt/endCrypt");


const router = require("express").Router();

//get new device key
router.post("/getkey", async (req, res) => {
    const { key } = req.body
    console.log(key)
    dbsqloperaiotn.loggerdb(req.body)
    const nkey = cryptoperation.getNewKey(key)
    res.json({
        status: true,
        data: nkey
    })
})

//add new device to the sql table
router.post("/addnewdevice", async (req, res) => {
    const { key } = req.body
    dbsqloperaiotn.loggerdb(req.body)
    const result = cryptoperation.decryption(key);
    if (result) {
        if (await dbsqloperaiotn.insertRecord(req.body)) {
            res.json({
                status: true,
                data: "Device added"
            })
        }
        else {
            res.json({
                status: false,
                data: "Pls check the input"
            })
        }
    }
    else {
        res.json({
            status: false,
            data: "contact admin"
        })
    }


})

//get unconfigured devices
router.post("/getucdevices", async (req, res) => {
    const data = await dbsqloperaiotn.getUCdevices();
    console.log(data)
    if (data) {
        res.json({
            status: true,
            data: data
        })
    }
    else {
        res.json({
            status: false,
            data: "No Records found"
        })
    }
})

//get unconfigured pin devices
router.post("/getupcdevices", async (req, res) => {
    const data = await dbsqloperaiotn.getUPCdevices();
    console.log(data)
    if (data) {
        res.json({
            status: true,
            data: data
        })
    }
    else {
        res.json({
            status: false,
            data: "No Records found"
        })
    }
})

//set pin config
router.post("/setpinconfig", async (req, res) => {
    const data = await dbsqloperaiotn.setPinconfiguration(req.body);
    console.log(data)
    if (data) {
        res.json({
            status: true,
            data: data
        })
    }
    else {
        res.json({
            status: false,
            data: "No Records found"
        })
    }
})

//set name for devices
router.post("/setdevicename", async (req, res) => {
    const { deviceMAC } = req.body
    const data = await dbsqloperaiotn.setDeviceName(deviceMAC);
    console.log(data)
    if (data) {
        res.json({
            status: true,
            data: "Device name is fixed"
        })
    }
    else {
        res.json({
            status: false,
            data: "Failed"
        })
    }
})

//set name for devices
router.post("/setdevicename", async (req, res) => {
    const { deviceMAC } = req.body
    const data = await dbsqloperaiotn.setDeviceName(deviceMAC);
    console.log(data)
    if (data) {
        res.json({
            status: true,
            data: "Device name is fixed"
        })
    }
    else {
        res.json({
            status: false,
            data: "Failed"
        })
    }
})

//get device id from the sql database
router.post("/getdeviceid", async (req, res) => {
    const { deviceMAC } = req.body
    dbsqloperaiotn.loggerdb(req.body)
    const result = await getDeviceID(deviceMAC);
    if (result) {
        res.json({
            status: true,
            data: result
        })
    }
    else {
        res.json({
            status: false,
            data: ""
        })
    }
})
module.exports = {
    router
}
const router = require("express").Router();
const { Config, allDevices, indconfig } = require("../../Constant data/deviceData");
const { Devicetable } = require("../DataBase Operation/Models/models");
const dboperations = require("../DataBase Operation/DB_operation")

//add a new Device
router.post("/addnewdevice", async (req, res) => {
    const { MAC } = req.body;
    if (await dboperations.checkForExistingDevice(MAC)) {
        res.json({
            status: "failed",
            msg: "Device Exist"
        })
    }
    else {
        await dboperations.addDevicetoDB(MAC).then((data) => {
            console.log(data)
            res.send(data);
        })
    }


})

//config device
router.post("/configdevices", (req, res) => {
    const { MAC, deviceID, config } = req.body;
    res.json({
        MAC, deviceID, config
    })
})
//listen for the confdevice page
router.post("/deviceConfigs", (req, res) => {
    console.log("got the req")
    res.json({ "types": Config.types })
})
//listen for the alldevice page
router.get("/alldevices", (req, res) => {
    console.log("got the all req")
    res.json({ allDevices })
})
//listen for the device - ID page
router.post("/devwithid", (req, res) => {
    console.log("all the best")
    const { devid } = req.body
    const result = allDevices.filter(dev => dev.devid === devid)
    if (result) {
        console.log(result[0].devid, indconfig[0].id)
        let config = indconfig.filter(i => i.id === result[0].devid)
        console.log(config)
        res.json({ data: result[0], devConfig: config })
    }
    else {
        res.send("No Data Found")
    }
});

module.exports = {
    router
}
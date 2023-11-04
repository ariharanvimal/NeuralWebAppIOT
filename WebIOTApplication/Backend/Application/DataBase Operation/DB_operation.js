const mongoose = require("mongoose")
const environment = require("../Environment/environment")
const { Devicetable } = require("./Models/models")

const connectToDatabase = () => {
    mongoose.connect(environment.dataBase.url + environment.dataBase.NeuralOrganics).then(() => {
        console.log("Connect to the DataBase")
    })
}

//check for existing device in the Database
async function checkForExistingDevice(MAC) {
    return await Devicetable.findOne({ deviceMAC: MAC }).then((data) => {
        if (data) {
            return true
        }
    })

}
// add new device to the database
async function addDevicetoDB(MAC) {
    return await Devicetable({ deviceMAC: MAC }).save().then((data) => {
        return ({
            status: "success",
            msg: "Added"
        })
    })
}
// config newdevice
async function configDevice(MAC, ID) {
    return await Devicetable.findOne({ deviceMAC: MAC }).then((data) => {
        if (data) {
            const devicedata = data
            if (data.configState) {
                return ({
                    data: data,
                    status: "success",
                    msg: "Already device configured"
                })
            }
            else {
                const result = Devicetable.findOneAndUpdate({ _id: devicedata._id }, { $set: { configState: true, deviceID: ID } }, { new: true })
                return result
                // if (err) {
                //     return ({
                //         status: "failed",
                //         msg: err
                //     })
                // }
                // else {
                //     return ({
                //         status: "success",
                //         msg: "Updates",
                //         data
                //     })
                // }
            }
        }

    })
}
//condfig pins
async function pinconfig(ID) {
    try {
        Devicetable.findOneandUpdate({ deviceID: ID },)
    } catch (error) {

    }
}



module.exports = {
    connectToDatabase, checkForExistingDevice, addDevicetoDB, configDevice, pinconfig
}
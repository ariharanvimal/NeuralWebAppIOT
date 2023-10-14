const mongoose = require("mongoose")
const environment = require("../Environment/environment")
const { Devicetable } = require("./Models/models")

const connectToDatabase = () => {
    mongoose.connect(environment.dataBase.url + environment.dataBase.NeuralOrganics).then(() => {
        console.log("Connect to the DataBase")
    })
}


async function checkForExistingDevice(MAC) {
    return await Devicetable.findOne({ deviceMAC: MAC }).then((data) => {
        if (data) {
            return true
        }
    })

}

async function addDevicetoDB(MAC) {
    return await Devicetable({ deviceMAC: MAC }).save().then((data) => {
        return ({
            status: "success",
            msg: "Added"
        })
    })
}

module.exports = {
    connectToDatabase, checkForExistingDevice, addDevicetoDB
}
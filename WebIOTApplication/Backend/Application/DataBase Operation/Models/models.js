const mongoose = require("mongoose")

const Devices = new mongoose.Schema({
    deviceMAC: {
        type: String,
        required: true
    },
    configState: {
        type: Boolean,
        default: false
    },
    deviceID: {
        type: String,
        default: ""
    }
})
const Devicetable = mongoose.model("Device_table", Devices);

module.exports = {
    Devicetable
}
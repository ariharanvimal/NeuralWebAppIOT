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
    },
    configState: {
        type: Boolean,
        default: false
    },
    pinConfig: {
        type: Boolean,
        default: false
    }
})
const Devicetable = mongoose.model("Device_table", Devices);

module.exports = {
    Devicetable
}
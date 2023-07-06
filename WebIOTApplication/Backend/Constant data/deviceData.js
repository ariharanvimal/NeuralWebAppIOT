const deviceData = [
    {
        devid: '1',
        deviceName: "Dev1",
        devType: "Esp8266",
        devStatus: true,
        ipAddress: "192.168.1.1",
        operation: "Tank Control",
        sector: 1
    },
    {
        devid: '2',
        deviceName: "Dev2",
        devType: "Esp32",
        devStatus: true,
        ipAddress: "192.168.1.2",
        operation: "Tank Control",
        sector: 2
    },
    {
        devid: '3',
        deviceName: "Dev3",
        devType: "Esp8266-01",
        devStatus: false,
        ipAddress: "192.168.1.3",
        operation: "Sensors",
        sector: 3

    },
    {
        devid: '4',
        deviceName: "Dev4",
        devType: "Esp8266",
        devStatus: false,
        ipAddress: "192.168.1.4",
        operation: "Tank Control",
        sector: 1
    },
    {
        devid: '5',
        deviceName: "Dev5",
        devType: "Esp32",
        devStatus: true,
        ipAddress: "192.168.1.5",
        operation: "Tank Control",
        sector: 2
    },
    {
        devid: '6',
        deviceName: "Dev6",
        devType: "Esp8266-01",
        devStatus: false,
        ipAddress: "192.168.1.6",
        operation: "Sensors",
        sector: 3

    },

]
const devConfig = {
    "types": ["", "ESP8266", "ESP32", "ESP8266-1"]
}

module.exports = {
    allDevices: deviceData, Config: devConfig
}
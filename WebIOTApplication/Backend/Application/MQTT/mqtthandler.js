const mqtt = require('mqtt')
const dbsqloperation = require("../DataBase Operation/DB_SQL_operation")
const { spawn } = require('child_process')

class MqttHandler {
    constructor() {
        this.mqttClient = null
        this.host = "mqtt://127.0.0.1:1883"
    }

    connect() {
        // Connect mqtt with credentials (in case of needed, otherwise we can omit 2nd param)
        this.mqttClient = mqtt.connect(this.host)

        // Mqtt error calback
        this.mqttClient.on('error', (err) => {
            console.log(err)
            this.mqttClient.end()
        })

        // Connection callback
        this.mqttClient.on('connect', () => {
            console.log(`mqtt client connected`)
        })

        // mqtt subscriptions
        this.mqttClient.subscribe('env')
        this.mqttClient.subscribe('humidity')

        // When a message arrives, console.log it
        this.mqttClient.on('message', function (topic, message) {

            if (topic === "env") {
                const data = JSON.parse(message.toString())
                const pythonProcess = spawn('C:/Users/Ariharan/AppData/Local/Programs/Python/Python310/python.exe', ['./SQL_Operation.py', data]);

                pythonProcess.stdout.on('data', (data) => {
                    console.log(`Python Script Output: ${data}`);
                });
                dbsqloperation.insertSensorRecord(data.temp, data.hum)
            }
            var pathwithdevid = topic.split('/')
            console.log(message.toString())
        })

        this.mqttClient.on('close', () => {
            console.log(`mqtt client disconnected`)
        })
    }

    // Sends a mqtt message to topic: mytopic
    sendMessage(message) {
        this.mqttClient.publish('/inTopic', message)
    }
}

module.exports = MqttHandler

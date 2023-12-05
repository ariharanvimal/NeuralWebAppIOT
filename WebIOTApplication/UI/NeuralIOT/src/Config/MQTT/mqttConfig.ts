import { IMqttServiceOptions } from 'ngx-mqtt';

export const mqtt = {
  hostname: 'raspberrypi.local',
  ws_port: 9001,
  mqtt_port: 1883,
};

export const mqttServiceOptions: IMqttServiceOptions = {
  hostname: mqtt.hostname,
  port: mqtt.ws_port,
  connectOnCreate: true,
};

import { Component, OnInit } from '@angular/core';
import { MqttService, IMqttMessage } from 'ngx-mqtt';

@Component({
  selector: 'app-mqtt-dashboard',
  templateUrl: './mqtt-dashboard.component.html',
  styleUrls: ['./mqtt-dashboard.component.css'],
})
export class MqttDashboardComponent implements OnInit {
  client!: any;
  msg: any;
  constructor(private mqttService: MqttService) {
    this.mqttService.connect();
  }
  ngOnInit(): void {
    this.mqttService.observe('env').subscribe((message: IMqttMessage) => {
      const payloadString = message.payload.toString(); // Assuming UTF-8 encoding
      const payloadObject = JSON.parse(payloadString);

      console.log(`Received message on topic ${message.topic}:`, payloadObject);

      // Perform actions based on the received message
      this.handleMessage(payloadObject);
    });
  }
  title = 'NeuralIOT';
  handleMessage(message: string): void {
    this.msg = message;
    console.log('Handling message:', message);
    // Perform your specific actions here
  }
}

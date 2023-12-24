import { Injectable } from '@angular/core';
import mqtt from 'mqtt';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MqttOperationService {
  private client!: mqtt.MqttClient;
  private topic = 'env'; // replace with your MQTT topic
  private messageSubject: Subject<any> = new Subject<any>();

  constructor() {
    this.connect();
  }

  private connect(): void {
    // Replace with your MQTT broker details
    this.client = mqtt.connect('mqtt://raspberrypi.local:9001');

    this.client.on('connect', () => {
      console.log('Connected to MQTT broker');
      this.subscribeToTopic();
    });

    this.client.on('message', (topic, message) => {
      console.log(`Message received on topic ${topic}: ${message.toString()}`);
      try {
        const parsedMessage = JSON.parse(message.toString());
        this.messageSubject.next(parsedMessage);
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    });
  }
  private subscribeToTopic(): void {
    this.client.subscribe(this.topic);
  }

  publishMessage(message: string): void {
    this.client.publish(this.topic, message);
  }

  getMessages(): Observable<any> {
    return this.messageSubject.asObservable();
  }

  disconnect(): void {
    if (this.client) {
      this.client.end();
      console.log('Disconnected from MQTT broker');
    }
  }
}

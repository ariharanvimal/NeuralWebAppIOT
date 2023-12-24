import { Component, OnInit } from '@angular/core';
import { NgxGauge, NgxGaugeModule } from 'ngx-gauge';
import { MqttOperationsService } from '../../Services/MqttServices/mqtt-operations.service';
import { MqttModule } from 'ngx-mqtt';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgxGaugeModule, MqttModule],
  providers: [MqttOperationsService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private messageSubscription: Subscription;
  messages: any;
  id: any;
  constructor(private mqttOperationServices: MqttOperationsService) {
    this.messageSubscription = this.mqttOperationServices
      .getMessages()
      .subscribe((message: any) => {
        this.messages = message;
      });
  }
  ngOnInit(): void {
    this.generateRandomNumber();
    this.generateRandomNumber2();

    console.log(this.messages);
  }
  gaugeType: String = 'semi';
  gaugeValue = 28.3;
  gaugeLabel = 'Speed';
  gaugeAppendText = 'km/hr';
  thickness = 10;
  randomNumber: number = 0;
  randomNumber2: number = 0;
  generatorInterval: any;

  thresholdConfig = {
    '0': { color: 'green' },
    '50': { color: 'orange' },
    '75': { color: 'red' },
  };

  generateRandomNumber() {
    this.generatorInterval = setInterval(() => {
      this.randomNumber = Math.floor(Math.random() * 101); // Generates a random number between 0 and 100
    }, 5000);
  }
  generateRandomNumber2() {
    this.generatorInterval = setInterval(() => {
      this.randomNumber2 = Math.floor(Math.random() * 101); // Generates a random number between 0 and 100
    }, 3000);
  }
  getGaugeColor(): string {
    // Define your color logic based on the value of randomNumber
    // For example, changing color based on ranges
    if (this.randomNumber < 30) {
      return 'green';
    } else if (this.randomNumber < 70) {
      return 'yellow';
    } else {
      return 'red';
    }
  }
  getGaugeColor2(): string {
    // Define your color logic based on the value of randomNumber
    // For example, changing color based on ranges
    if (this.randomNumber2 < 30) {
      return 'green';
    } else if (this.randomNumber2 < 70) {
      return 'yellow';
    } else {
      return 'red';
    }
  }
}

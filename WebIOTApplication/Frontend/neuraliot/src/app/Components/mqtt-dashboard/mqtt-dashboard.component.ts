import { Component, OnInit } from '@angular/core';
import { MqttOperationService } from '../../Services/mqttServices/mqtt-operation.service';
import { NgxGauge, NgxGaugeModule } from 'ngx-gauge';

@Component({
  selector: 'app-mqtt-dashboard',
  standalone: true,
  imports: [NgxGaugeModule],
  templateUrl: './mqtt-dashboard.component.html',
  styleUrl: './mqtt-dashboard.component.css',
})
export class MqttDashboardComponent implements OnInit {
  message: any;
  thresholdConfig = {
    '0': { color: 'green' },
    '50': { color: 'orange' },
    '100': { color: 'red' },
  };
  constructor(private mqttserviceoperation: MqttOperationService) {}
  ngOnInit(): void {
    this.mqttserviceoperation.getMessages().subscribe((data: any) => {
      this.message = data;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';
import { devices } from '../devices/Interface/device.interface';
import { indconfig } from './Interface/cofigInterface.interface';

@Component({
  selector: 'app-devconfoper',
  templateUrl: './devconfoper.component.html',
  styleUrls: ['./devconfoper.component.css'],
})
export class DevconfoperComponent implements OnInit {
  deviceID = '';
  deviceDetails!: devices;
  configcollapse = false;
  operatecollapse = true;
  loading = false;
  deviceconfiguration!: indconfig;
  sample = [
    {
      pinno: '1',
    },
    {
      pinno: '2',
    },
  ];
  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService
  ) {}
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((param) => {
      this.deviceID = param['id'];
    });
    this.getDeviceWithID();
  }
  getDeviceWithID() {
    this.apiService.getdevwithid(this.deviceID).subscribe((res: any) => {
      console.log(res);
      this.deviceDetails = res.data;
      this.deviceconfiguration = res.devConfig[0];
      console.log(this.deviceconfiguration);
    });
  }
  config_collapsed(): void {
    this.configcollapse = !this.configcollapse;
  }
  operate_collapsed(): void {
    this.operatecollapse = !this.operatecollapse;
  }
}

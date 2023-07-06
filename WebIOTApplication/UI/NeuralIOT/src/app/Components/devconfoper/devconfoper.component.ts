import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';
import { devices } from '../devices/Interface/device.interface';

@Component({
  selector: 'app-devconfoper',
  templateUrl: './devconfoper.component.html',
  styleUrls: ['./devconfoper.component.css'],
})
export class DevconfoperComponent implements OnInit {
  deviceID = '';
  deviceDetails!: devices;
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
      this.deviceDetails = res.data;
      console.log(this.deviceDetails);
    });
  }
}

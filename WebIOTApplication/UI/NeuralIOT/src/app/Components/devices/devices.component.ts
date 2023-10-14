import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { devConfig, devices } from './Interface/device.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { newDevice } from '../devconfoper/Interface/NewDeviceInterface.interface';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css'],
})
export class DevicesComponent implements OnInit {
  collapsed = true;
  emptyForm = false;
  deviceTypes: devConfig = {
    types: [],
  };
  devices: devices[] = [];
  addDeviceForm!: FormGroup;
  newDevice: newDevice = {
    devName: '',
    devType: '',
    devMac: '',
  };

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit() {
    this.addDeviceForm = this.formBuilder.group({
      devtype: ['', Validators.required],
      devname: ['', Validators.required],
      devmac: ['', Validators.required],
    });
    this.getdeviceconfig();
    this.getdevices();
  }
  addDevice() {
    if (this.addDeviceForm.valid) {
      console.log(this.addDeviceForm.controls['devname'].value);
      this.newDevice.devName = this.addDeviceForm.controls['devname'].value;
      this.newDevice.devType = this.addDeviceForm.controls['devtype'].value;
      this.newDevice.devMac = this.addDeviceForm.controls['devmac'].value;
      this.emptyForm = false;
      console.log(this.newDevice);
    } else {
      this.emptyForm = true;
    }
  }
  getdeviceconfig() {
    this.apiService.getDeviceConfig().subscribe((res) => {
      this.deviceTypes.types = res.types;
    });
  }
  getdevices() {
    this.apiService.getDevices().subscribe((res: any) => {
      this.devices = res.allDevices;
      console.log(this.devices);
    });
  }
  toogle_collapsed(): void {
    this.collapsed = !this.collapsed;
  }

  getURL(id: string) {
    return location.origin + '/devco' + '?id=' + id;
  }
}

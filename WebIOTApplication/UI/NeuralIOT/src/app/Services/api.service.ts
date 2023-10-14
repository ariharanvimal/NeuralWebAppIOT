import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import {
  devConfig,
  devices,
} from '../Components/devices/Interface/device.interface';
import { newDevice } from '../Components/devconfoper/Interface/NewDeviceInterface.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}
  getDeviceConfig() {
    return this.httpClient.post<devConfig>(
      'http://localhost:4000/deviceConfigs',
      {}
    );
  }
  getDevices() {
    return this.httpClient.get<devices[]>(
      'http://localhost:4000/alldevices',
      {}
    );
  }
  getdevwithid(id: string) {
    console.log(id);
    return this.httpClient.post('http://localhost:4000/devwithid', {
      devid: id,
    });
  }
  addNewDevice(data: newDevice) {}
}

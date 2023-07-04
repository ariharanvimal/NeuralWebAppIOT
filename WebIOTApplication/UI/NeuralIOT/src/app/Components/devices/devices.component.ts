import { Component, OnInit } from '@angular/core';
import { devicestypes } from './device.constants';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css'],
})
export class DevicesComponent implements OnInit {
  collapsed = true;
  deviceTypes = devicestypes;
  ngOnInit(): void {
    this.deviceTypes.unshift('select');
  }

  toogle_collapsed(): void {
    this.collapsed = !this.collapsed;
  }
}

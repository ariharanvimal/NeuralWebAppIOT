import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';
import { devices } from '../devices/Interface/device.interface';
import {
  Input,
  editPin,
  indconfig,
} from './Interface/cofigInterface.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  editPins!: editPin;
  // settling_input
  pinMode = ['', 'Input', 'Output'];
  inputType = ['', 'Analog', 'Digital'];
  option_type = '';
  addPinDialogue = false;
  editInputPinDialogue = false;

  inputAnalogEditPin = false;
  inputDigitalEditPin = false;
  inputAnalogAddPin = false;
  inputDigitalAddPin = false;
  pinEditSelected = false;
  pinAddSelected = false;
  editPinForm!: FormGroup;
  addPinForm!: FormGroup;
  //input pin form
  inputPinForm!: FormGroup;
  //output pin form
  outputPinForm!: FormGroup;
  prevpin = '';
  addInputpin = false;
  addOutputPin = false;
  analogORdigital!: boolean;
  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private formBuilder: FormBuilder
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
  saveconfig(conf: any) {
    console.log(conf);
  }
  openEdit(conf: Input) {
    this.inputPinForm = this.formBuilder.group({
      p_no: ['', Validators.required],
      p_type: ['', Validators.required],
      p_name: ['', Validators.required],
      // p_default: ['', Validators.required],
      // edit_pmin: ['', Validators.required],
      // edit_pmax: ['', Validators.required],
    });
    if (this.prevpin !== conf.p_no) {
      this.prevpin = conf.p_no;
      if (conf.p_type === 'A') {
        this.option_type = conf.p_type;
        this.editInputPinDialogue = true;
        this.inputPinForm.patchValue({
          p_no: conf.p_no,
          p_type: conf.p_type,
          p_name: conf.p_name,
          // p_default: conf.p_default,
        });
      } else if (conf.p_type === 'D') {
        this.editInputPinDialogue = true;
        this.option_type = conf.p_type;
        this.inputPinForm.patchValue({
          p_no: conf.p_no,
          p_type: conf.p_type,
          p_name: conf.p_name,
          // p_default: conf.p_default,
        });
      }
    } else {
      this.editInputPinDialogue = false;
      this.prevpin = '';
    }
  }
  closeEditor(option: string) {
    if (option === 'addinputanalog') {
      this.addPinDialogue = false;
    }
    if (option === 'editinputdialog') {
      this.editInputPinDialogue = false;
    }
    if (option === 'add') {
      this.pinAddSelected = false;
    }
    if (option === 'edit') this.pinEditSelected = false;
    this.prevpin = '';
  }
  //add input pin function
  addinputPinEditor(type: string) {
    this.addPinDialogue = true;
    if (type === 'analog') {
      this.inputPinForm = this.formBuilder.group({
        add_pno: ['', Validators.required],
        add_pname: ['', Validators.required],
      });
    }
    if (type === 'digital') {
    }
  }
  addPinEditor(option: string) {
    this.pinAddSelected = true;
  }
  addAnalogPinEditor(option: string) {
    this.addInputpin = true;
  }
  addDigitalPinEditor(option: string) {
    this.addOutputPin = true;
  }
  cancelAdd() {
    if (this.addPinDialogue) this.addPinDialogue = false;
  }
  pinModeChange(value: any) {
    console.log(value.target.value);
    if (value.target.value === 'Input') {
      if (this.addOutputPin) {
        this.addOutputPin = false;
      }
      this.addInputpin = true;
      this.inputPinForm = this.formBuilder.group({
        add_pno: ['', Validators.required],
        add_ptype: ['', Validators.required],
        add_pname: ['', Validators.required],
      });
    }
    if (value.target.value === 'Output') {
      if (this.addInputpin) {
        this.addInputpin = false;
      }
      this.addOutputPin = true;
      this.outputPinForm = this.formBuilder.group({
        add_pno: ['', Validators.required],
        add_ptype: ['', Validators.required],
        add_pname: ['', Validators.required],
        default: ['', Validators.required],
      });
    }
  }
  newouputpintypechange(value: any) {
    console.log(value.target.value);
    if (value.target.value === 'Analog') {
      this.analogORdigital = true;
    } else {
      this.analogORdigital = false;
    }
  }
}

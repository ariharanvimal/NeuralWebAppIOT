import { TestBed } from '@angular/core/testing';

import { MqttOperationService } from './mqtt-operation.service';

describe('MqttOperationService', () => {
  let service: MqttOperationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MqttOperationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

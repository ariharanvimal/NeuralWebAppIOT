import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevconfoperComponent } from './devconfoper.component';

describe('DevconfoperComponent', () => {
  let component: DevconfoperComponent;
  let fixture: ComponentFixture<DevconfoperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevconfoperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevconfoperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

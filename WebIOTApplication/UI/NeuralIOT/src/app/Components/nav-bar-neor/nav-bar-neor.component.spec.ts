import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarNEORComponent } from './nav-bar-neor.component';

describe('NavBarNEORComponent', () => {
  let component: NavBarNEORComponent;
  let fixture: ComponentFixture<NavBarNEORComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavBarNEORComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavBarNEORComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

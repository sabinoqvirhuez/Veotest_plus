import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RobotProfileComponent } from './robot-profile.component';

describe('RobotProfileComponent', () => {
  let component: RobotProfileComponent;
  let fixture: ComponentFixture<RobotProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RobotProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RobotProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

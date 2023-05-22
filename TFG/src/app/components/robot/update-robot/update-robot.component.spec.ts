import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRobotComponent } from './update-robot.component';

describe('UpdateRobotComponent', () => {
  let component: UpdateRobotComponent;
  let fixture: ComponentFixture<UpdateRobotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateRobotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateRobotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

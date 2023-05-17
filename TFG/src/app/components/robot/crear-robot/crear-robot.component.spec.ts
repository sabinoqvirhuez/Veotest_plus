import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearRobotComponent } from './crear-robot.component';

describe('CrearRobotComponent', () => {
  let component: CrearRobotComponent;
  let fixture: ComponentFixture<CrearRobotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearRobotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearRobotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

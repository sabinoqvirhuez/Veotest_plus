import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarRobotComponent } from './eliminar-robot.component';

describe('EliminarRobotComponent', () => {
  let component: EliminarRobotComponent;
  let fixture: ComponentFixture<EliminarRobotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarRobotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarRobotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

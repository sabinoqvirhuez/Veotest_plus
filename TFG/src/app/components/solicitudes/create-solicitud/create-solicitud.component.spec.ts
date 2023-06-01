import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSolicitudComponent } from './create-solicitud.component';

describe('CreateSolicitudComponent', () => {
  let component: CreateSolicitudComponent;
  let fixture: ComponentFixture<CreateSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSolicitudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

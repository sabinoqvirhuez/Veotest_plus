import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateIncidenciaComponent } from './create-incidencia.component';

describe('CreateIncidenciaComponent', () => {
  let component: CreateIncidenciaComponent;
  let fixture: ComponentFixture<CreateIncidenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateIncidenciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateIncidenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

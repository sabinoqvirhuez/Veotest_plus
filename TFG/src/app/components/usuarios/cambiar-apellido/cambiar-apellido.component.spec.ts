import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiarApellidoComponent } from './cambiar-apellido.component';

describe('CambiarApellidoComponent', () => {
  let component: CambiarApellidoComponent;
  let fixture: ComponentFixture<CambiarApellidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CambiarApellidoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CambiarApellidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

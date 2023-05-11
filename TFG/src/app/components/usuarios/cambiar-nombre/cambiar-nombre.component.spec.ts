import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiarNombreComponent } from './cambiar-nombre.component';

describe('CambiarNombreComponent', () => {
  let component: CambiarNombreComponent;
  let fixture: ComponentFixture<CambiarNombreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CambiarNombreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CambiarNombreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileIncidenciaComponent } from './profile-incidencia.component';

describe('ProfileIncidenciaComponent', () => {
  let component: ProfileIncidenciaComponent;
  let fixture: ComponentFixture<ProfileIncidenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileIncidenciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileIncidenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

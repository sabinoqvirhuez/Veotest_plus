import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateKeyComponent } from './create-key.component';

describe('CreateKeyComponent', () => {
  let component: CreateKeyComponent;
  let fixture: ComponentFixture<CreateKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateKeyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

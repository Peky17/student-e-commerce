import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartitoUsuarioComponent } from './cartito-usuario.component';

describe('CartitoUsuarioComponent', () => {
  let component: CartitoUsuarioComponent;
  let fixture: ComponentFixture<CartitoUsuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartitoUsuarioComponent]
    });
    fixture = TestBed.createComponent(CartitoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReservacionesComponent } from './view-reservaciones.component';

describe('ViewReservacionesComponent', () => {
  let component: ViewReservacionesComponent;
  let fixture: ComponentFixture<ViewReservacionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewReservacionesComponent]
    });
    fixture = TestBed.createComponent(ViewReservacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

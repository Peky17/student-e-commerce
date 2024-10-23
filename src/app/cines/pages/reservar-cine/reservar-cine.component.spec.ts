import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservarCineComponent } from './reservar-cine.component';

describe('ReservarCineComponent', () => {
  let component: ReservarCineComponent;
  let fixture: ComponentFixture<ReservarCineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservarCineComponent]
    });
    fixture = TestBed.createComponent(ReservarCineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

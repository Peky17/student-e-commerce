import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayementTeatroCardComponent } from './payement-teatro-card.component';

describe('PayementTeatroCardComponent', () => {
  let component: PayementTeatroCardComponent;
  let fixture: ComponentFixture<PayementTeatroCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PayementTeatroCardComponent]
    });
    fixture = TestBed.createComponent(PayementTeatroCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayementCardComponent } from './payement-card.component';

describe('PayementCardComponent', () => {
  let component: PayementCardComponent;
  let fixture: ComponentFixture<PayementCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PayementCardComponent]
    });
    fixture = TestBed.createComponent(PayementCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

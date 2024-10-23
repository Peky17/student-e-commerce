import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayementMuseoCardComponent } from './payement-museo-card.component';

describe('PayementMuseoCardComponent', () => {
  let component: PayementMuseoCardComponent;
  let fixture: ComponentFixture<PayementMuseoCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PayementMuseoCardComponent]
    });
    fixture = TestBed.createComponent(PayementMuseoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

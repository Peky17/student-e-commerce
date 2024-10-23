import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceTeatroComponent } from './invoice-teatro.component';

describe('InvoiceTeatroComponent', () => {
  let component: InvoiceTeatroComponent;
  let fixture: ComponentFixture<InvoiceTeatroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvoiceTeatroComponent]
    });
    fixture = TestBed.createComponent(InvoiceTeatroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

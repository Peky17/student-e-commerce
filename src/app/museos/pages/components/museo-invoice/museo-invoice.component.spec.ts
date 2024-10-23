import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuseoInvoiceComponent } from './museo-invoice.component';

describe('MuseoInvoiceComponent', () => {
  let component: MuseoInvoiceComponent;
  let fixture: ComponentFixture<MuseoInvoiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MuseoInvoiceComponent]
    });
    fixture = TestBed.createComponent(MuseoInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

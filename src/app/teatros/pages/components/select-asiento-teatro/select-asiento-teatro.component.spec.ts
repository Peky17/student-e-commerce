import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAsientoTeatroComponent } from './select-asiento-teatro.component';

describe('SelectAsientoTeatroComponent', () => {
  let component: SelectAsientoTeatroComponent;
  let fixture: ComponentFixture<SelectAsientoTeatroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectAsientoTeatroComponent]
    });
    fixture = TestBed.createComponent(SelectAsientoTeatroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

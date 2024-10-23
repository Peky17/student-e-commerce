import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCinesComponent } from './view-cines.component';

describe('ViewCinesComponent', () => {
  let component: ViewCinesComponent;
  let fixture: ComponentFixture<ViewCinesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewCinesComponent]
    });
    fixture = TestBed.createComponent(ViewCinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMuseosComponent } from './view-museos.component';

describe('ViewMuseosComponent', () => {
  let component: ViewMuseosComponent;
  let fixture: ComponentFixture<ViewMuseosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewMuseosComponent]
    });
    fixture = TestBed.createComponent(ViewMuseosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoMuseoComponent } from './info-museo.component';

describe('InfoMuseoComponent', () => {
  let component: InfoMuseoComponent;
  let fixture: ComponentFixture<InfoMuseoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoMuseoComponent]
    });
    fixture = TestBed.createComponent(InfoMuseoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservarMuseoComponent } from './reservar-museo.component';

describe('ReservarMuseoComponent', () => {
  let component: ReservarMuseoComponent;
  let fixture: ComponentFixture<ReservarMuseoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservarMuseoComponent]
    });
    fixture = TestBed.createComponent(ReservarMuseoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

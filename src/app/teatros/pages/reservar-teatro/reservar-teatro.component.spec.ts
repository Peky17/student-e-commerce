import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservarTeatroComponent } from './reservar-teatro.component';

describe('ReservarTeatroComponent', () => {
  let component: ReservarTeatroComponent;
  let fixture: ComponentFixture<ReservarTeatroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservarTeatroComponent]
    });
    fixture = TestBed.createComponent(ReservarTeatroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

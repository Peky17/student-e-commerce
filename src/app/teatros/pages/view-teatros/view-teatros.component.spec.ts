import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTeatrosComponent } from './view-teatros.component';

describe('ViewTeatrosComponent', () => {
  let component: ViewTeatrosComponent;
  let fixture: ComponentFixture<ViewTeatrosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewTeatrosComponent]
    });
    fixture = TestBed.createComponent(ViewTeatrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

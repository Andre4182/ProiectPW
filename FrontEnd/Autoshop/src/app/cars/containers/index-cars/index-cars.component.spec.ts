import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexCarsComponent } from './index-cars.component';

describe('IndexCarsComponent', () => {
  let component: IndexCarsComponent;
  let fixture: ComponentFixture<IndexCarsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndexCarsComponent]
    });
    fixture = TestBed.createComponent(IndexCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

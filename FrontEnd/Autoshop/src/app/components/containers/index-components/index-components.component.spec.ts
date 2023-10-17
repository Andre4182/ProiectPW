import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexComponentsComponent } from './index-components.component';

describe('IndexComponentsComponent', () => {
  let component: IndexComponentsComponent;
  let fixture: ComponentFixture<IndexComponentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndexComponentsComponent]
    });
    fixture = TestBed.createComponent(IndexComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterProblemComponent } from './filter-problem.component';

describe('FilterProblemComponent', () => {
  let component: FilterProblemComponent;
  let fixture: ComponentFixture<FilterProblemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterProblemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterProblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

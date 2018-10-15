import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSummaryViewComponent } from './dashboard-summary-view.component';

describe('DashboardSummaryViewComponent', () => {
  let component: DashboardSummaryViewComponent;
  let fixture: ComponentFixture<DashboardSummaryViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardSummaryViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardSummaryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

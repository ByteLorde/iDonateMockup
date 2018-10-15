import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketReportsViewComponent } from './ticket-reports-view.component';

describe('TicketReportsViewComponent', () => {
  let component: TicketReportsViewComponent;
  let fixture: ComponentFixture<TicketReportsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketReportsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketReportsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

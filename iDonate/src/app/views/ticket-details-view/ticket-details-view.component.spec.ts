import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketDetailsViewComponent } from './ticket-details-view.component';

describe('TicketDetailsViewComponent', () => {
  let component: TicketDetailsViewComponent;
  let fixture: ComponentFixture<TicketDetailsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketDetailsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketDetailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

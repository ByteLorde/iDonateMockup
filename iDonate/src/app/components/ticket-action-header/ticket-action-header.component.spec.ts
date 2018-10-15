import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketActionHeaderComponent } from './ticket-action-header.component';

describe('TicketActionHeaderComponent', () => {
  let component: TicketActionHeaderComponent;
  let fixture: ComponentFixture<TicketActionHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketActionHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketActionHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

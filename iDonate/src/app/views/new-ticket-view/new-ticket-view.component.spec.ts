import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTicketViewComponent } from './new-ticket-view.component';

describe('NewTicketViewComponent', () => {
  let component: NewTicketViewComponent;
  let fixture: ComponentFixture<NewTicketViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTicketViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTicketViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

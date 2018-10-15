import { Component, OnInit }   from '@angular/core';

import { NgbDropdownConfig }   from "@ng-bootstrap/ng-bootstrap";
import { Subscription }        from "rxjs/index";

import { Status, Ticket }      from "../../domain/Ticket";
import { TicketService }       from "../../services/ticket-service/ticket.service";
import { TicketQuery }         from "../../domain/TicketQuery";

@Component({
  selector: 'app-ticket-reports-view',
  templateUrl: './ticket-reports-view.component.html',
  styleUrls: ['./ticket-reports-view.component.less']
})
export class TicketReportsViewComponent implements OnInit {

  public statuses = Status;
  public ticketQuery: TicketQuery = {
    pageNumber  : 1,
    startDate   : null,
    endDate     : null,
    statuses    : [
      Status.PENDING,
      Status.READY_FOR_APPROVAL,
      Status.REOPENED,
      Status.RESOLVED
    ],
    perPage: 12
  };
  public tickets: Ticket[];
  public totalMatches: number;

  constructor(private ticketService: TicketService,
              private dropdownConfig: NgbDropdownConfig) {

    dropdownConfig.autoClose = false;
  }

  ngOnInit() {
    this.searchTickets();
  }

  /**
   * Returns the ticket status as a class name for the little circle next to ticket status
   * in the table.
   *
   * @param {Status} status Current status of the ticket
   * @returns {string} Class name to color the circle next to the ticket in the table.
   */
  public getStatusAsClass(status: Status): string {
    if ( status === Status.READY_FOR_APPROVAL ) return "blue";
    if ( status === Status.RESOLVED ) return "green";
    if ( status === Status.PENDING  ) return "orange";
    if ( status === Status.REOPENED ) return "violet";
  }

  /**
   * Filters the tickets appropriately using the TicketQuery object and the ticket service.
   *
   * @returns {Subscription} A subscription to the returned TicketInfo object.
   */
  public searchTickets(): Subscription {
    return this.ticketService.getFilteredTickets(this.ticketQuery)
      .subscribe( ticketInfo => {
        if (!ticketInfo) {
          this.tickets = [];
          this.totalMatches = 0;
          return;
        }
        this.tickets = ticketInfo.tickets;
        this.totalMatches = ticketInfo.numTickets;
      });
  }

  /**
   * Logic for using the date range picker to select a date range to filter tickets by.
   * This date range applies to the Open Date of the ticket only.
   *
   * @param {Date[]} dates A range of dates, index 0 being start date, index 1 being end date.
   */
  public selectDateRange(dates: Date[]): void {
    this.ticketQuery.startDate = dates[0];
    this.ticketQuery.endDate   = dates[1];
    this.searchTickets();
  }

  /**
   * Adds or removes the selected status from the status filters in our TicketQuery object.
   *
   * @param {Status} status The status selected to toggle from the TicketQuery.
   */
  public toggleStatus(status: Status): void {
    if (this.ticketQuery.statuses.includes(status)) {
      this.ticketQuery.statuses.splice(this.ticketQuery.statuses.indexOf(status), 1);
    }
    else {
      this.ticketQuery.statuses.push(status);
    }
    this.searchTickets();
  }

  /**
   * Called from the pagination, updates our data in our table with respect to the selected
   * pagination page number.
   *
   * @param selectedPageNumber The page number selected from the pagination.
   */
  public updateData(selectedPageNumber): void {
    this.ticketQuery.pageNumber = selectedPageNumber;
    this.searchTickets();
  }

}

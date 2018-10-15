import { Injectable }   from '@angular/core';

import {Observable, of} from "rxjs/index";

import * as tickets     from "../../../assets/mock/mock_tickets.json";
import {CustomerInfo}   from "../../domain/CustomerInfo";
import {Status, Ticket} from "../../domain/Ticket";
import {TicketInfo}     from "../../domain/TicketInfo";
import {TicketMetrics}  from "../../domain/TicketMetrics";
import {TicketNote}     from "../../domain/TicketNote";
import {TicketQuery}    from "../../domain/TicketQuery";

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  public existingTickets: Ticket[];

  constructor() {
    this.existingTickets = tickets.default;
    for ( let ticket of this.existingTickets ) {
      ticket.dateOpened   = ticket.dateOpened   ? new Date(ticket.dateOpened)   : null;
      ticket.dateResolved = ticket.dateResolved ? new Date(ticket.dateResolved) : null;
    }
  }

  /**
   * This method appends a note to an existing ticket by ID.
   *
   * @param {number} ticketId The ID of the ticket we're appending a note to.
   * @param {TicketNote} note The note that we're adding to the ticket.
   */
  public addNoteToTicketByTicketId(ticketId: number, note: TicketNote): void {
    for ( let ticket of this.existingTickets ) {
      if ( ticket.ticketId === ticketId ) {
        ticket.comments.unshift(note);
        return;
      }
    }
  }

  /**
   * This method creates a new ticket and adds it to the existing tickets.
   *
   * @param {Ticket} newTicket New ticket being added.
   * @returns {Observable<Ticket>} The ticket that was added.
   */
  public createNewTicket(newTicket: Ticket): Observable<Ticket> {
    this.existingTickets.push(newTicket);
    return of(newTicket);
  }

  /**
   * This method is designed to return the contact information about a customer by their ID.
   * due to the structure of dummy data and no actual User database being written, we simply grab the
   * caller name and caller telephone from our tickets if the customerID for the ticket matches the
   * query ID.
   *
   * @param {number} id The customer's ID we're using to find the customer.
   * @returns {Observable<CustomerInfo>} A CustomerInfo observable containing details about the customer.
   */
  public getCustomerInfoById(id: number): Observable<CustomerInfo> {

    let customerInfo = new CustomerInfo();

    // We loop through the tickets because our customer objects are all dummy data
    // Stored in our dummy tickets. Ideally, we could have a database of actual customers
    // And interface with that instead of the tickets.
    for ( let ticket of this.existingTickets ) {
      if ( ticket.customerId === id ) {
        customerInfo.id = id;
        customerInfo.name = ticket.callerName;
        customerInfo.telephone = ticket.callerPhone;
        return of(customerInfo);
      }
    }
    return of(null);
  }

  /**
   * This method returns an observable of our existing tickets.
   *
   * @returns {Observable<Ticket[]>} The existing tickets.
   */
  public getAllTickets(): Observable<Ticket[]> {
    return of(this.existingTickets);
  }

  /**
   * Returns a TicketMetrics object containing metric information
   * about our existing tickets to by supplied to the Summary page.
   *
   * @returns {Observable<TicketMetrics>} Observable of ticket metric.
   */
  public getMetrics(): Observable<TicketMetrics> {
    let metric = new TicketMetrics();
    metric.total = this.existingTickets.length;
    for ( let ticket of this.existingTickets ) {
      if ( ticket.status === Status.PENDING  ) metric.pending  += 1;
      if ( ticket.status === Status.REOPENED ) metric.reopened += 1;
      if ( ticket.status === Status.READY_FOR_APPROVAL ) metric.ready += 1;
    }
    return of(metric);
  }

  /**
   * Grabs a ticket from existing tickets by its ID.
   *
   * @param {number} id The ticket ID we're attempting to grab.
   * @returns {Observable<Ticket>} An Observable of that ticket.
   */
  public getTicketById(id: number): Observable<Ticket> {
    for ( let ticket of this.existingTickets ) {
      if ( ticket.ticketId === id ) return of(ticket);
    }
    return of(null);
  }

  /**
   * This method is designed to filter our existing tickets with respect to the TicketQuery
   * object that contains all filter criteria that we should be filtering by.
   *
   * @param {TicketQuery} ticketQuery The object containing all filter data to be filtered by.
   * @returns {Observable<TicketInfo>} An object containing the filtered tickets and number of tickets associated with it.
   */
  public getFilteredTickets(ticketQuery: TicketQuery): Observable<TicketInfo> {

    // We filter through the tickets/reports page, and if somehow the ticketQuery
    // Object doesn't specify how many tickets per page then we return null.
    if ( !ticketQuery.perPage ) return of(null);

    // sd and ed are shorthanded startDate/endDate objects
    let sd = ticketQuery.startDate;
    let ed = ticketQuery.endDate;

    // Set the start hours to beginning of the day and end of day
    if (sd) {
      sd.setHours(0);
      sd.setMinutes(0);
      sd.setSeconds(0);
    }

    if (ed) {
      ed.setHours(23);
      ed.setMinutes(59);
      ed.setSeconds(59);
    }

    // Copy the existing tickets to not mutate our data.
    let selectedTickets = this.existingTickets.slice();
    selectedTickets = selectedTickets.filter( (ticket) => {

      // If we aren't filtering by a date, return true.
      if ( !ticketQuery.startDate && !ticketQuery.endDate ) return true;

      // If we don't have a start date then we filter by end date.
      if ( !ticketQuery.startDate ) return ticket.dateOpened.getTime() < ticketQuery.endDate.getTime();

      // If we don't have an end date then we filter by start date.
      if ( !ticketQuery.endDate )   return ticket.dateOpened.getTime() > ticketQuery.startDate.getTime();

      return ticket.dateOpened.getTime() >= ticketQuery.startDate.getTime() &&
        ticket.dateOpened.getTime() <= ticketQuery.endDate.getTime();
    });

    // Apply status filter
    selectedTickets = selectedTickets.filter( (ticket) => {
      return ticketQuery.statuses.includes(ticket.status);
    });

    // Safety check for pagination
    if ( selectedTickets.length < (ticketQuery.pageNumber - 1) * ticketQuery.perPage ) {
      return of(null);
    }

    let numTickets = selectedTickets.length;

    // Logic for pagination, grabs only the right range of tickets with respect to pagination data supplied in TicketQuery object.
    selectedTickets = selectedTickets.slice( (ticketQuery.pageNumber - 1) * ticketQuery.perPage, ticketQuery.pageNumber * ticketQuery.perPage );

    let ticketInfo = new TicketInfo(selectedTickets, numTickets);
    return of(ticketInfo);
  }

  /**
   * This method updates the status of a ticket by its ID.
   *
   * @param {number} id The ID of the ticket we're going to mutate.
   * @param {Status} status The new Status the ticket will have.
   */
  public updateTicketStatusById(id: number, status: Status): void {
    for ( let ticket of this.existingTickets ) {
      if ( ticket.ticketId === id ) {
        ticket.status = status;
        return;
      }
    }
  }

}

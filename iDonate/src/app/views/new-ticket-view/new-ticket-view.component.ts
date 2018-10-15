import { Component, OnInit } from '@angular/core';
import {Router}              from "@angular/router";

import {Status, Ticket}      from "../../domain/Ticket";
import {AuthService}         from "../../services/auth/auth.service";
import {TicketService}       from "../../services/ticket-service/ticket.service";

@Component({
  selector: 'app-new-ticket-view',
  templateUrl: './new-ticket-view.component.html',
  styleUrls: ['./new-ticket-view.component.less']
})
export class NewTicketViewComponent implements OnInit {

  public contactName: string;
  public contactPhone: string;
  public customerId: number;
  public details: string;
  public subject: string;

  constructor(private ticketService: TicketService,
              private authService:   AuthService,
              private router:        Router) { }

  ngOnInit() {
  }

  /**
   * This method creates a new ticket from the information provided on the page's input fields.
   *
   */
  public createNewTicket(): void {

    let newTicket = new Ticket();
    newTicket.ticketId     = this.ticketService.existingTickets.length + 1;
    newTicket.customerId   = this.customerId;
    newTicket.callerName   = this.contactName;
    newTicket.callerPhone  = this.contactPhone;
    newTicket.repName      = this.authService.getUsername();
    newTicket.details      = this.details;
    newTicket.subject      = this.subject;
    newTicket.dateOpened   = new Date();
    newTicket.dateResolved = null;
    newTicket.status       = Status.PENDING;
    newTicket.comments     = [];

    if (!this.isValid(newTicket)) return;

    this.ticketService.createNewTicket(newTicket)
      .subscribe(ticket => {
        let path = "/tickets/" + ticket.ticketId;
        this.router.navigateByUrl(path);
      });

  }

  /**
   * This method is called when the user attempts to search a customer ID.
   * If the id exists, it will grab the customer's name and phone number and
   * populate in the fields for the user.
   *
   * @param {number} id The query id we're searching for.
   */
  public updateCustomerById(id: number): void {
    this.ticketService.getCustomerInfoById(id)
      .subscribe( customerInfo => {
        if ( !customerInfo ) {
          this.customerId   = null;
          this.contactPhone = null;
          this.contactName  = null;
          return;
        }

        this.contactPhone = customerInfo.telephone;
        this.contactName  = customerInfo.name;
        this.customerId   = customerInfo.id;
      })
  }

  /**
   * This method checks to ensure all required fields are present when creating a new ticket.
   *
   * @param {Ticket} ticket The ticket being validated.
   * @returns {boolean} True if the ticket has all required fields, false otherwise.
   */
  public isValid(ticket: Ticket): boolean {
    // The reason we do the !!() is to explicitly cast as a boolean.
    return !!(ticket.customerId  &&
              ticket.callerName  &&
              ticket.callerPhone &&
              ticket.repName     &&
              ticket.subject     &&
              ticket.details);
  }

}

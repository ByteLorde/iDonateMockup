import {Ticket} from "./Ticket";

export class TicketInfo {

  public tickets: Ticket[];
  public numTickets: number;

  constructor(tickets: Ticket[], numTickets: number) {
    this.tickets  = tickets;
    this.numTickets = numTickets;
  }

}

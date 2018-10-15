import {TicketNote} from "./TicketNote";

export class Ticket {

  public ticketId     : number;
  public customerId   : number;
  public callerName   : string;
  public callerPhone  : string;
  public repName      : string;
  public details      : string;
  public subject      : string;
  public dateOpened   : Date;
  public dateResolved : Date;
  public status       : Status;
  public comments     : TicketNote[];

  constructor() {

  }
}

export enum Status {
    PENDING = "Pending",
    READY_FOR_APPROVAL = "Ready For Approval",
    RESOLVED = "Resolved",
    REOPENED = "Reopened"
}


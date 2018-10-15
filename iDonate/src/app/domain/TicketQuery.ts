import {Status} from "./Ticket";

export class TicketQuery {

  pageNumber : number;
  perPage?   : number = 10;
  startDate  : Date;
  endDate    : Date;
  statuses   : Status[];

}

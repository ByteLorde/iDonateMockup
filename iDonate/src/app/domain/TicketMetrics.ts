
export class TicketMetrics {

  public pending:  number;
  public ready:    number;
  public reopened: number;
  public total:    number;

  constructor() {
    this.pending  = 0;
    this.ready    = 0;
    this.reopened = 0;
    this.total    = 0;
  }
}

import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { flatMap }                from "rxjs/operators"

import { AuthService }            from "../../services/auth/auth.service";
import { Status, Ticket }         from "../../domain/Ticket";
import { TicketNote }             from "../../domain/TicketNote";
import { TicketService }          from "../../services/ticket-service/ticket.service";


@Component({
  selector: 'app-ticket-details-view',
  templateUrl: './ticket-details-view.component.html',
  styleUrls: ['./ticket-details-view.component.less']
})
export class TicketDetailsViewComponent implements OnInit {

  public id: number;
  public statuses = Status;
  public ticket: Ticket;
  public ticketComment: string = "";

  constructor(private activatedRoute: ActivatedRoute,
              private ticketService:  TicketService,
              private authService:    AuthService,
              private router:         Router) {

  }

  ngOnInit() {

    this.activatedRoute.params
      .pipe(
        flatMap(params => this.ticketService.getTicketById(+params.id))
      )
      .subscribe(ticket => {
        this.ticket = ticket;
        if (!this.ticket) {
          this.router.navigateByUrl("/tickets");
        }
      });
  }

  /**
   * Pushes a note to the selected ticket.
   */
  public submitNote(): void {

    if (!this.ticketComment) return;

    let newTicketNote       = new TicketNote();
    newTicketNote.noteId    = this.ticket.comments.length + 1;
    newTicketNote.ticketId  = this.ticket.ticketId;
    newTicketNote.user      = this.authService.getUsername();
    newTicketNote.message   = this.ticketComment;
    newTicketNote.timestamp = new Date();
    this.ticketService.addNoteToTicketByTicketId(this.ticket.ticketId, newTicketNote)
    this.ticketComment = "";
  }

  /**
   * Updates the status of a ticket.
   *
   * @param {Status} key The status the current ticket's status will be overriden to.
   */
  public updateTicketStatus(key: Status): void {
    this.ticketService.updateTicketStatusById(this.ticket.ticketId, key);
  }

}

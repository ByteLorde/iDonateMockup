import { Component, OnInit } from '@angular/core';
import { Router }            from "@angular/router";

@Component({
  selector: 'app-ticket-action-header',
  templateUrl: './ticket-action-header.component.html',
  styleUrls: ['./ticket-action-header.component.less']
})
export class TicketActionHeaderComponent implements OnInit {

  public queryId: number;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public newTicket(): void {
    this.router.navigateByUrl("/new")
  }

  public searchTicket(id: number): void {
    let path = "/tickets/" + id;
    this.router.navigateByUrl(path);
  }

}

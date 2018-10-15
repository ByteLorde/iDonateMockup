import { Component, OnInit } from '@angular/core';

import {Observable}          from "rxjs/index";
import {tap}                 from "rxjs/internal/operators";

import {ActionItem}          from "../../domain/ActionItem";
import {TicketMetrics}       from "../../domain/TicketMetrics";
import {ActionItemService}   from "../../services/action-item/action-item.service";
import {TicketService}       from "../../services/ticket-service/ticket.service";

@Component({
  selector: 'app-dashboard-summary-view',
  templateUrl: './dashboard-summary-view.component.html',
  styleUrls: ['./dashboard-summary-view.component.less']
})
export class DashboardSummaryViewComponent implements OnInit {

  public hideCompleted : boolean;
  public metric : TicketMetrics;

  constructor(private actionItemService: ActionItemService,
              private ticketService: TicketService) {

    this.hideCompleted = true;
  }

  ngOnInit() {
    this.ticketService.getMetrics()
      .subscribe( metric => {
        this.metric = metric;
      });
  }

  /**
   * This method returns an observable of ActionItem[] containing
   * All action items to be populated in the summary page.
   *
   * @returns {Observable<ActionItem[]>} An Observable of action items to populate the summary page with.
   */
  public getActionItems(): Observable<ActionItem[]> {
    return this.actionItemService.getAllActionItems()
      .pipe( tap(value => value.filter( (elem) => this.hideCompleted ? !elem.completed : elem)));
  }

  /**
   * Toggles an action item to be completed or not (checkbox).
   *
   * @param {ActionItem} actionItem The action item the toggle action was applied to.
   */
  public toggleItem(actionItem: ActionItem): void {
    this.actionItemService.toggleCompletedStatus(actionItem.id);
  }

}

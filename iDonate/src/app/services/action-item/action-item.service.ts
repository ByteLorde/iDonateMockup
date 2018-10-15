import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { ActionItem } from "../../domain/ActionItem";

@Injectable({
  providedIn: 'root'
})
export class ActionItemService {

  // Dummy data.
  public checklistItems : ActionItem[] = [
    {
      id: 0,
      text: "Hire Adam Goins :)",
      completed: true
    },
    {
      id: 1,
      text: "Aenean placerat suscipit sollicitudin.",
      completed: false
    },
    {
      id: 2,
      text: "Vestibulum vitae lorem mattis, rhoncus nisl sed, maximus metus.",
      completed: false
    },
    {
      id: 3,
      text: "Ut euismod blandit sem, et imperdiet sapien tristique et.",
      completed: false
    },
    {
      id: 4,
      text: "Quisque laoreet sed risus id condimentum.",
      completed: false
    },
    {
      id: 5,
      text: "Vivamus et tempus lacus. Phasellus consectetur dolor.",
      completed: false
    },
    {
      id: 6,
      text: "Vestibulum turpis diam, lacinia vitae neque non, lacinia tincidunt nisi.",
      completed: false
    },
    {
      id: 7,
      text: "Donec nunc purus, rhoncus in turpis sit amet, iaculis malesuada.",
      completed: false
    },
    {
      id: 8,
      text: "Pellentesque habitant morbi tristique senectus et netus.",
      completed: false
    },
    {
      id: 9,
      text: "Mauris quis massa posuere, condimentum ipsum.",
      completed: false
    },
    {
      id: 10,
      text: "Donec congue vestibulum tellus.",
      completed: false
    },
    {
      id: 11,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      completed: false
    },
    {
      id: 12,
      text: "Buy cake for Michael Scott's Birthday!",
      completed: false
    },
    {
      id: 13,
      text: "Make website responsive",
      completed: false
    },

  ];

  constructor() {

  }

  /**
   * Returns an observable of the action items contained in this service.
   *
   * @returns {Observable<ActionItem[]>}
   */
  public getAllActionItems(): Observable<ActionItem[]> {
    return of(this.checklistItems);
  }

  /**
   * Updates the complete status of an action item.
   *
   * @param {number} id The ID of the action item we're toggling the status of.
   */
  public toggleCompletedStatus(id: number): void {

    for (let item of this.checklistItems) {
      if (item.id === id) {
        item.completed = !item.completed;
      }
    }
  }
}

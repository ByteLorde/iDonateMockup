import { Component, Input, OnInit } from '@angular/core';

import { TicketNote } from "../../domain/TicketNote";

@Component({
  selector: 'app-note-component',
  templateUrl: './note-component.component.html',
  styleUrls: ['./note-component.component.less']
})
export class NoteComponentComponent implements OnInit {

  @Input() public note: TicketNote;
  constructor() { }

  ngOnInit() {
  }

}

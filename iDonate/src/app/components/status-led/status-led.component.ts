import {Component, Input, OnInit} from '@angular/core';
import {Status} from "../../domain/Ticket";

@Component({
  selector: 'app-status-led',
  templateUrl: './status-led.component.html',
  styleUrls: ['./status-led.component.less']
})
export class StatusLedComponent implements OnInit {

  @Input() status: Status;

  constructor() { }

  ngOnInit() {

  }

  public getStatus(): string {
    console.log(this.status);
    return this.status;
  }

}

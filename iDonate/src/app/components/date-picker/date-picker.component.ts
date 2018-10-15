import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.less']
})
export class DatePickerComponent implements OnInit {

  @Output() dateRange: EventEmitter<Date[]> = new EventEmitter<Date[]>();

  constructor() {

  }

  ngOnInit() {

  }

  public onValueChange(event): void {
    this.dateRange.emit(event);
  }
}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-box',
  templateUrl: './info-box.component.html',
  styleUrls: ['./info-box.component.less']
})
export class InfoBoxComponent implements OnInit {

  @Input() public detail: string;
  @Input() public label:  string;

  constructor() { }

  ngOnInit() {
  }

}

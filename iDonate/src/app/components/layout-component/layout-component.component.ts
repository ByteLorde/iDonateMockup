import { Component, Input, OnInit } from '@angular/core';

import { AuthService }              from "../../services/auth/auth.service";

@Component({
  selector: 'app-layout-component',
  templateUrl: './layout-component.component.html',
  styleUrls: ['./layout-component.component.less']
})
export class LayoutComponentComponent implements OnInit {

  @Input() public pageSubtitle: string;
  @Input() public pageTitle: string;
  public username : string;

  constructor(private authService: AuthService) {

  }

  ngOnInit() {
    this.username = this.authService.getUsername();
  }

  public logout(): void {
    this.authService.logout();
  }

}

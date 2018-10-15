import { Component, OnInit } from '@angular/core';
import { Router }            from "@angular/router";

import { AuthService }       from "../../services/auth/auth.service";

@Component({
  selector: 'app-sign-in-view',
  templateUrl: './sign-in-view.component.html',
  styleUrls: ['./sign-in-view.component.less']
})
export class SignInViewComponent implements OnInit {

  public password : string;
  public username : string;

  constructor(private authService: AuthService) {
    this.username = "";
    this.password = "";
  }

  ngOnInit() {

  }

  /**
   * Logs in using the auth service. Logins happen without authentication, whatever value
   * The user gives the input fields are the credentials that will be stored for the login session.
   */
  public login() : void {
    this.authService.login(this.username, this.password);
  }

}

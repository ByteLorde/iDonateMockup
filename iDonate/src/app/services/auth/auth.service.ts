import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { User } from "../../domain/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // The current user browsing our system.
  private loginURL  = "/summary";
  private logoutURL = "/login";
  private user : User;

  /**
   * Constructs a null User object.
   * This grabs the user from the local storage in the event the page is refreshed.
   */
  constructor(private router: Router) {
    this.user = null;
    let item = localStorage.getItem("user");
    if (item) {
      let loaded = JSON.parse(item);
      this.user = new User(loaded.username, loaded.password);
    }
  }

  /**
   * This method returns the username of the logged in user.
   *
   * @returns {string}
   */
  public getUsername(): string {
    return this.user.getUsername();
  }

  /**
   * This method returns the current login state of the user.
   *
   * @returns {boolean} True if the User is logged in, False otherwise.
   */
  public isLoggedIn() : boolean {
    // Returns true if the user is not null or undefined.
    return !!(this.user)
  }

  /**
   * This method will be called from the SignInViewComponent when a User attempts to log in.
   * If no user is logged in, it will construct a new dummy user object out of whatever values
   * Are populated in the sign in fields.
   *
   * We store user data in the Local Storage so that the auth session persists through page refresh.
   *
   * @param {string} username The username for the User attempting to sign in.
   * @param {string} password The password for the User attempting to sign in.
   * @returns {User} The User object that was signed in. (Dummy object for now).
   */
  public login(username : string, password : string): void {

    // If somehow the user sends an attemptLogin request while they're logged in,
    if ( this.isLoggedIn() ) return;
    if ( !username || !password ) return;

    // Otherwise, return a new User object. We could do validation here if we wanted but for now
    // We just construct a dummy user object with whatever is populated in the fields.
    this.user = new User(username, password);
    localStorage.setItem("user", JSON.stringify(this.user));
    this.router.navigateByUrl(this.loginURL);

  }

  /**
   * This method will log the user out by setting the instanced User object to null.
   * This would require validation, however since we're using dummy data this implementation should suffice.
   */
  public logout(): void {
    this.user = null;
    localStorage.removeItem("user");
    this.router.navigateByUrl(this.logoutURL);
  }


}






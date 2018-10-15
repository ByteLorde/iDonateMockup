import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';

import { AuthService } from "../auth/auth.service";

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router,
              private authService : AuthService) {

  }

  /**
   * Router guard to ensure that the attempted activated route is only accepted
   * if the user is logged in.
   *
   * @param {ActivatedRouteSnapshot} route Current route attempting to be directed to.
   * @param {RouterStateSnapshot} state  Current state of the router.
   * @returns {boolean} True if the criteria is met to accept the route, false otherwise. (criteria being user is logged in)
   */
  public canActivate(route: ActivatedRouteSnapshot,
                     state: RouterStateSnapshot) : boolean {

    const isLoggedIn = this.authService.isLoggedIn();
    if (isLoggedIn) {
      return true;
    }
    else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}


/**
 * An abstraction for all fields pertaining to a User of our system.
 */
export class User {

  constructor(private username : string,
              private password : string) {

  }

  public getUsername() : string {
    return this.username;
  }

  // May or may not want this
  private getPassword() : string {
    return this.password;
  }


}

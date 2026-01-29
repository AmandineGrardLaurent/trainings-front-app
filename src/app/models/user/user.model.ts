/**
 * User model representing a user in the application.
 */
export class UserModel {
  name: string;
  email: string;
  password: string;

  /**
   * Creates a new user instance.
   * @param name - The name of the user.
   * @param email - The email address of the user.
   * @param password - The password of the user.
   */
  constructor(name: string, email: string, password: string) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

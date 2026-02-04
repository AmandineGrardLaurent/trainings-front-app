/**
 * User model representing a user in the application.
 */
export class UserModel {
  id: number;
  name: string;
  email: string;
  password: string;
  status: string[];

  /**
   * Creates a new user instance.
   * @param name - The name of the user.
   * @param email - The email address of the user.
   * @param password - The password of the user.
   */
  constructor(id: number, name: string, email: string, password: string, status: string[]) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.status = status;
  }
}

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
   */
  constructor(id: number, name: string, email: string, password: string, status: string[]) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.status = status;
  }
}

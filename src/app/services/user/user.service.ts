import { PasswordService } from './../password/password.service';
import { Injectable } from '@angular/core';
import { UserModel } from '../../models/user/user.model';
import { ApiUserService } from '../api/api-user.service';
import { map } from 'rxjs';
import { CartService } from '../cart/cart.service';

/**
 * UserService
 * ----------------
 * This service manages the application's user state and provides
 * utility methods for authentication, role checks, and user verification.
 * It communicates with the ApiUserService for backend calls.
 */
@Injectable({
  providedIn: 'root',
})
export class UserService {
  // Stores the currently loggedIn user, null if no user is logged in
  private user: UserModel | null = null;

  constructor(
    private apiUserService: ApiUserService,
    private passwordService: PasswordService,
  ) {
    // const storedUser = localStorage.getItem('userLoggedIn');
    // if (storedUser) {
    //   this.user = JSON.parse(storedUser);
    // }
  }

  // Registers a user locally (does not call backend)
  register(user: UserModel) {
    console.log('Registering user:', user);
    this.user = user;
  }

  // Returns the currently logged-in user
  getUser() {
    return this.user;
  }

  // Sets the current user in the service state
  // Optionally, this could persist in localStorage
  setUser(user: UserModel) {
    this.user = user;
    // localStorage.setItem('userLoggedIn', JSON.stringify(user));
  }

  // Logs in a user locally by setting the service state
  loginUser(user: UserModel) {
    this.user = user;
    // localStorage.setItem('userLoggedIn', JSON.stringify(user));
  }

  // Logs out the current user and clears the state
  logoutUser() {
    this.user = null;
    // localStorage.removeItem('userLoggedIn');
  }

  // Checks if a user is currently logged in
  isLoggedIn() {
    return this.user !== null;
  }

  // Checks if the logged-in user has admin privileges
  isAdmin(): boolean {
    return this.user?.status.includes('ADMIN') ?? false;
  }

  // Verifies if a user exists by email using the API
  verifyUserExists(email: string) {
    return this.apiUserService.getUserByEmail(email).pipe(map((users) => users.length > 0));
  }

  // Verifies if the provided password matches the user with the given email
  verifyUserPassword(email: string, password: string) {
    return this.apiUserService
      .getUserByEmail(email)
      .pipe(
        map(
          (users) =>
            users.length > 0 && this.passwordService.comparePassword(password, users[0].password),
        ),
      );
  }
}

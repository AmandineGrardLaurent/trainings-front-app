import { Injectable } from '@angular/core';
import { UserModel } from '../../models/user/user.model';
import { ApiUserService } from '../api/api-user.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: UserModel | null = null;

  constructor(private apiUserService: ApiUserService) {
    // const storedUser = localStorage.getItem('userLoggedIn');
    // if (storedUser) {
    //   this.user = JSON.parse(storedUser);
    // }
  }

  register(user: UserModel) {
    console.log('Registering user:', user);
    this.user = user;
  }

  getUser() {
    return this.user;
  }

  setUser(user: UserModel) {
    this.user = user;
    // localStorage.setItem('userLoggedIn', JSON.stringify(user));
  }

  loginUser(user: UserModel) {
    this.user = user;
    // localStorage.setItem('userLoggedIn', JSON.stringify(user));
  }

  logoutUser() {
    this.user = null;
    // localStorage.removeItem('userLoggedIn');
  }

  isLoggedIn() {
    return this.user !== null;
  }

  isAdmin() {}

  verifyUserExists(email: string) {
    return this.apiUserService.getUserByEmail(email).pipe(map((users) => users.length > 0));
  }

  verifyUserPassword(email: string, password: string) {
    return this.apiUserService
      .getUserByEmail(email)
      .pipe(map((users) => users.length > 0 && users[0].password === password));
  }
}

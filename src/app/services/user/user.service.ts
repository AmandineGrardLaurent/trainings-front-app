import { Injectable } from '@angular/core';
import { UserModel } from '../../models/user/user.model';
import { signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user = signal<UserModel | null>(null);

  register(user: UserModel) {
    this.user.set(user);
  }

  getUser() {
    return this.user.asReadonly();
  }
}

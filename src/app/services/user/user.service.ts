import { Injectable } from '@angular/core';
import { UserModel } from '../../models/user/user.model';
import { signal } from '@angular/core';
import { ApiUserService } from '../api/api-user.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user = signal<UserModel | null>(null);

  constructor(private apiUserService: ApiUserService) {}

  register(user: UserModel) {
    this.user.set(user);
  }

  getUser() {
    return this.user.asReadonly();
  }

  verifyUserExists(email: string) {
    return this.apiUserService.getUserByEmail(email).pipe(map((users) => users.length > 0));
  }
}

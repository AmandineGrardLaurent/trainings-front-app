import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UserModel } from '../../models/user/user.model';

@Injectable({
  providedIn: 'root',
})
export class ApiUserService {
  constructor(private http: HttpClient) {}

  public getUsers() {
    return this.http.get<UserModel[]>(`${environment.apiUrl}/users`);
  }

  public getUserByEmail(email: string) {
    return this.http.get<UserModel[]>(`${environment.apiUrl}/users?email=${email.toLowerCase()}`);
  }

  public postUser(user: UserModel) {
    console.log('API - Creating user:', user);
    const userNotAdmin = { ...user, roles: ['USER'] };
    return this.http.post<UserModel>(`${environment.apiUrl}/users`, userNotAdmin);
  }
}

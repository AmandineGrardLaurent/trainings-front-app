import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UserModel } from '../../models/user/user.model';
import { map } from 'rxjs/operators';

/**
 * ApiUserService
 *
 * This service is responsible for all HTTP requests related to users.
 * It communicates directly with the backend API and does not contain
 * any application state or business logic.
 */
@Injectable({
  providedIn: 'root',
})
export class ApiUserService {
  // Injects Angular HttpClient for making HTTP requests
  constructor(private http: HttpClient) {}

  // Fetches the complete list of users from the API
  // returns Observable containing an array of userModel
  public getUsers() {
    return this.http.get<UserModel[]>(`${environment.apiUrl}/users`);
  }

  // Fetches a single user by its unique identifier
  public getUserById(id: number) {
    return this.http.get<UserModel[]>(`${environment.apiUrl}/users/${id}`);
  }

  // Fetches users matching a given email address
  // The email is converted to lowercase to ensure consistency
  public getUserByEmail(email: string) {
    return this.http.get<UserModel[]>(`${environment.apiUrl}/users?email=${email.toLowerCase()}`);
  }

  // Creates a new user in the database
  // The user is automatically assigned the USER status
  public postUser(user: UserModel) {
    console.log('API - Creating user:', user);
    const userNotAdmin = { ...user, status: ['USER'] };
    return this.http.post<UserModel>(`${environment.apiUrl}/users`, userNotAdmin);
  }

  // Retrieves all users with ADMIN status
  public getAdmins() {
    return this.http
      .get<UserModel[]>(`${environment.apiUrl}/users`)
      .pipe(map((users) => users.filter((user) => user.status?.includes('ADMIN'))));
  }

  // Deletes a user by its ID
  public deleteUser(id: number) {
    return this.http.delete(`${environment.apiUrl}/users/${id}`);
  }
}

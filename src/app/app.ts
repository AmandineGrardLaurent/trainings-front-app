import { UserService } from './services/user/user.service';
import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true,
})
export class App {
  protected readonly title = signal('trainings-front-app');

  constructor(private userService: UserService) {}

  // Checks if a user is currently logged in.
  isLoggedIn = () => {
    return this.userService.getUser();
  };

  // Checks if the currently logged-in user has admin privileges.
  isAdmin = () => {
    return this.userService.isAdmin();
  };
}

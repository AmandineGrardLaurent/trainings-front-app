import { Component } from '@angular/core';
import { UserModel } from '../../models/user/user.model';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-profile.component',
  imports: [],
  templateUrl: './profile.component.html',
  standalone: true,
})
export class ProfileComponent {
  // Signal that holds the user state (read-only)
  userSignal;

  // Local variable to hold the current value of the user
  userValue: UserModel | null = null;

  constructor(private userService: UserService) {
    // Get the user signal from the UserService
    this.userSignal = this.userService.getUser();

    // Read the current value of the signal and store it in a local variable
    this.userValue = this.userSignal();
  }
}

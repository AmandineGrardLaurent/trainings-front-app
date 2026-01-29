import { Component, effect } from '@angular/core';
import { UserModel } from '../../models/user/user.model';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-profile.component',
  imports: [],
  templateUrl: './profile.component.html',
  standalone: true,
})
export class ProfileComponent {
  userSignal;
  userValue: UserModel | null = null;

  constructor(private userService: UserService) {
    this.userSignal = this.userService.getUser();
    this.userValue = this.userSignal();
  }
}

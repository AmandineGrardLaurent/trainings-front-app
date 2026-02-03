import { Component } from '@angular/core';
import { UserModel } from '../../models/user/user.model';
import { UserService } from '../../services/user/user.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile.component',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  standalone: true,
})
export class ProfileComponent {
  // Local variable to hold the current value of the user
  userValue: UserModel | null = null;

  constructor(
    private userService: UserService,
    private router: Router,
  ) {
    this.userValue = this.userService.getUser();
  }

  logout() {
    this.userService.logoutUser();
    alert('Déconnexion réussie !');
    this.router.navigateByUrl('/');
  }
}

import { ApiUserService } from './../../services/api/api-user.service';
import { UserService } from './../../services/user/user.service';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

/**
 * Component responsible for handling user authentication (login).
 *
 * This component manages the login form, verifies user existence
 * and credentials, and redirects the user based on the result.
 */
@Component({
  selector: 'app-auth-form.component',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './auth-form.component.html',
  standalone: true,
})
export class AuthFormComponent {
  /**
   * Reactive form used for user authentication.
   * Contains email and password fields.
   */
  authForm: FormGroup;

  /**
   * Constructor initializes the authentication form
   * and injects required services.
   */
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private apiUserService: ApiUserService,
  ) {
    this.authForm = this.fb.group({
      email: [''],
      password: [''],
    });
  }

  /**
   * Handles the user login process.
   *
   * - Checks if form values are present
   * - Verifies if the user exists
   * - Validates the password
   * - Stores the authenticated user
   * - Redirects to the profile page on success
   */
  loginUser() {
    const { email, password } = this.authForm.value;
    if (!email || !password) return;

    this.userService.verifyUserExists(email).subscribe((exists) => {
      if (!exists) {
        alert('Utilisateur inexistant. Veuillez vous enregistrer.');
        this.router.navigateByUrl('/register');
        return;
      }

      this.userService.verifyUserPassword(email, password).subscribe((valid) => {
        if (!valid) {
          alert('Mot de passe incorrect');
        } else {
          this.apiUserService.getUserByEmail(email).subscribe((users) => {
            const user = users[0];
            this.userService.setUser(user);
            alert('Connexion réussie !');
            this.router.navigateByUrl('/profile');
          });
        }
      });
    });
  }
}

import { UserService } from './../../services/user/user.service';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiUserService } from '../../services/api/api-user.service';

@Component({
  selector: 'app-register.component',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './register.component.html',
})

/**
 * Component responsible for user registration.
 */
export class RegisterComponent {
  registerForm: FormGroup;

  /**
   * Constructor to initialize the registration form and inject necessary services.
   * @param fb - FormBuilder to create the form group
   * @param userService - UserService to handle user registration
   * @param router - Router to navigate after registration
   */
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private apiUserService: ApiUserService,
  ) {
    this.registerForm = this.fb.group({
      name: [''],
      email: [''],
      password: [''],
    });
  }
  /**
   * Handles the user registration process.
   */
  addUser() {
    if (this.registerForm.valid) {
      this.apiUserService.postUser(this.registerForm.value).subscribe((user) => {
        this.userService.setUser(user);
        alert('Inscription réussie ! Veuillez vous connecter.');
      });

      // Navigate to the auth page after successful registration
      this.router.navigateByUrl('/auth');
    }
  }
}

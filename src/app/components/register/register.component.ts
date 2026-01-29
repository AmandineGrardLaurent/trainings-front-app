import { UserService } from './../../services/user/user.service';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

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
      this.userService.register(this.registerForm.value);

      // Reset the form after submit
      this.registerForm.reset();
      // Navigate to the profile page after successful registration
      this.router.navigateByUrl('/profile');
    }
  }
}

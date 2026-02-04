import { UserService } from './../../services/user/user.service';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiUserService } from '../../services/api/api-user.service';
import { registerFormSchema } from '../../validators/register-form.schema';
import { PasswordService } from '../../services/password/password.service';

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
    private passwordService: PasswordService,
  ) {
    this.registerForm = this.fb.group(registerFormSchema);
  }
  /**
   * Handles the user registration process.
   */
  addUser() {
    if (this.registerForm.valid) {
      // Hash the password before sending
      const formValue = { ...this.registerForm.value };
      formValue.password = this.passwordService.hashPassword(formValue.password);

      this.apiUserService.postUser(formValue).subscribe((user) => {
        this.userService.setUser(user);
        alert('Inscription réussie ! Veuillez vous connecter.');

        // Navigate to the auth page after successful registration
        this.router.navigateByUrl('/auth');
      });
    }
  }
}

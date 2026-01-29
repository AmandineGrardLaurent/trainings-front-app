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
export class RegisterComponent {
  registerForm: FormGroup;

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

  addUser() {
    if (this.registerForm.valid) {
      this.userService.register(this.registerForm.value);

      // Reset the form after submit
      this.registerForm.reset();
      this.router.navigateByUrl('/profile');
    }
  }
}

import { UserService } from './../../services/user/user.service';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-auth-form.component',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './auth-form.component.html',
  standalone: true,
})
export class AuthFormComponent {
  authForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
  ) {
    this.authForm = this.fb.group({
      email: [''],
      password: [''],
    });
  }

  loginUser() {
    this.userService.verifyUserExists(this.authForm.value.email).subscribe((exists) => {
      if (!exists) {
        alert("L'utilisateur n'existe pas. Veuillez vous inscrire.");
        this.router.navigateByUrl('/register');
      } else {
        // Navigate to the profile page after successful login
        this.router.navigateByUrl('/profile');
      }
    });
  }
}

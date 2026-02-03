import { Validators } from '@angular/forms';

export const registerFormSchema = {
  name: [
    '',
    [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-ZÀ-ÿ\s-]+$/)],
  ],
  email: ['', [Validators.required, Validators.email]],
  password: [
    '',
    [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/)],
  ],
};

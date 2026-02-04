import { Validators } from '@angular/forms';

/**
 * registerFormSchema
 * ------------------
 * Defines the structure and validation rules for the user registration form.
 * This schema can be passed to FormBuilder to create a reactive form.
 */
export const registerFormSchema = {
  /**
   * Name field
   * - Required
   * - Minimum length: 3 characters
   * - Only letters (including accented), spaces, and hyphens are allowed
   */
  name: [
    '',
    [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-ZÀ-ÿ\s-]+$/)],
  ],

  /**
   * Email field
   * - Required
   * - Must be a valid email format
   */
  email: ['', [Validators.required, Validators.email]],

  /**
   * Password field
   * - Required
   * - Minimum length: 6 characters
   * - Must contain at least one uppercase letter and one digit
   */
  password: [
    '',
    [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/)],
  ],
};

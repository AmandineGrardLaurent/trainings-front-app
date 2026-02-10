import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user/user.service';

/**
 * Route guard to protect routes that require authentication.
 *
 * This guard checks if the user is logged in.
 * If the user is not logged in, they are redirected to the authentication page.
 */
export const authGuard: CanActivateFn = (route, state) => {
  // Inject UserService to check if the user is logged in
  const userService = inject(UserService);

  // Inject Router to perform navigation if access is denied
  const router = inject(Router);

  // If the user is not logged in, redirect to '/auth'
  if (!userService.isLoggedIn()) {
    return router.createUrlTree(['/auth']);
  }
  // User is logged in, allow access
  return true;
};

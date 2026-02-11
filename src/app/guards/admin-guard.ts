import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user/user.service';

/**
 * Route guard to protect admin-only routes.
 *
 * This guard checks if the user is:
 * - Logged in
 * - Has an admin status
 *
 * If either condition is not met, the user is redirected to the authentication page.
 */
export const adminGuard: CanActivateFn = (route, state) => {
  // Inject the UserService to check login and admin status
  const userService = inject(UserService);

  // Inject Router to perform navigation if access is denied
  const router = inject(Router);

  // If the user is not logged in or not an admin, redirect to '/auth'
  if (!userService.isLoggedIn() || !userService.isAdmin()) {
    return router.createUrlTree(['/auth']);
  }

  // User is an admin, allow access
  return true;
};

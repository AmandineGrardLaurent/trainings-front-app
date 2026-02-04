import { CartComponent } from './components/cart/cart.component';
import { TrainingsComponent } from './components/trainings/trainings.component';
import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { authGuard } from './guards/auth-guard';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { adminGuard } from './guards/admin-guard';

// Define the application routes
export const routes: Routes = [
  { path: '', component: HomepageComponent },

  // Route for the trainings page
  { path: 'trainings', component: TrainingsComponent },

  // Route for the cart page
  { path: 'cart', component: CartComponent },

  // Route for the registration page
  { path: 'register', component: RegisterComponent },

  // Route for the profile page
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard],
  },

  // Route for the authentication form page
  { path: 'auth', component: AuthFormComponent },

  // Route for the admin dashboard page
  { path: 'admin', component: AdminDashboardComponent, canActivate: [adminGuard] },
];

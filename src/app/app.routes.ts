import { CartComponent } from './components/cart/cart.component';
import { TrainingsComponent } from './components/trainings/trainings.component';
import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';

// Define the application routes
export const routes: Routes = [
  // Route for the trainings page
  { path: 'trainings', component: TrainingsComponent },

  // Route for the cart page
  { path: 'cart', component: CartComponent },

  // Route for the registration page
  { path: 'register', component: RegisterComponent },

  // Route for the profile page
  { path: 'profile', component: ProfileComponent },
];

import { Injectable } from '@angular/core';
import { TrainingModel } from '../../models/training/training.model';
import { CartModel } from '../../models/cart/cart.model';

@Injectable({
  // Makes this service a singleton and injectable throughout the app
  providedIn: 'root',
})

/**
 * Service to manage the shopping cart
 */
export class CartService {
  // Internal CartModel instance to manage cart logic
  private cart = new CartModel();

  // Expose the trainings signal as a readonly signal
  trainings = this.cart.trainings.asReadonly();

  /**
   * Adds a training to the cart
   * @param training - The training to add
   */
  addTraining(training: TrainingModel) {
    this.cart.addTraining(training);
  }

  /**
   * Removes a training from the cart
   * @param training - The training to remove
   */
  removeTraining(training: TrainingModel) {
    this.cart.removeTraining(training);
  }

  /**
   * Clears all trainings from the cart
   */
  clearCart() {
    this.cart.clearCart();
  }
}

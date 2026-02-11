import { Injectable } from '@angular/core';
import { TrainingModel } from '../../models/training/training.model';
import { CartModel } from '../../models/cart/cart.model';

import { ApiOrderService } from '../api/api-order.service';
import { UserModel } from '../../models/user/user.model';

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

  constructor(private apiOrderService: ApiOrderService) {}

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

  /**
   * Gets the total price of the cart
   * @returns - The total price of all trainings in the cart
   */
  getTotalCart() {
    return this.cart.totalPrice();
  }

  /**
   * Updates the quantity of a specific training in the cart.
   *
   * @param training - The training to update.
   * @param quantity - The new quantity.
   */
  updateTrainingQuantityCart(training: TrainingModel, quantity: number) {
    this.cart.updateTrainingQuantity(training, quantity);
  }

  /**
   * Prepares an order object based on the current cart contents and user.
   *
   * @param user - The user placing the order.
   * @returns An order object containing the user, trainings list, and total price.
   */
  addOrder(user: UserModel) {
    const trainingsList = this.cart.trainings();
    const totalPrice = this.getTotalCart();

    return {
      user,
      trainingsList,
      totalPrice,
    };
  }
}

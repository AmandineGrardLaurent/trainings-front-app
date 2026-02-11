import { ApiOrderService } from './../../services/api/api-order.service';
import { UserService } from './../../services/user/user.service';
import { Component, OnInit, effect } from '@angular/core';
import { TrainingModel } from '../../models/training/training.model';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart/cart.service';

/**
 * Component responsible for displaying and managing the user's shopping cart.
 *
 * Handles adding/removing trainings, updating quantities, calculating totals,
 * and placing orders.
 */
@Component({
  selector: 'app-cart.component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  // Array of trainings currently in the cart
  listCartTrainings: TrainingModel[] = [];

  // Total price of the cart
  totalPrice: number = 0;

  /**
   * Constructor
   * @param cartService Service that manages the cart state
   * @param userService Service that manages user authentication
   * @param apiOrderService Service to interact with the backend for orders
   */
  constructor(
    private cartService: CartService,
    private userService: UserService,
    private apiOrderService: ApiOrderService,
  ) {
    // Create an effect to automatically update listCartTrainings and totalPrice whenever the signal changes
    effect(() => {
      this.listCartTrainings = this.cartService.trainings();
      this.totalPrice = this.cartService.getTotalCart();
    });
  }

  // Previously we assigned the trainings here, but now effect() handles updates automatically
  ngOnInit(): void {
    // this.listCartTrainings = this.cartService.trainings()
  }

  // Remove a training from the cart using the CartService
  removeTrainingFromCart(training: TrainingModel) {
    this.cartService.removeTraining(training);
  }

  // Clear all trainings from the cart
  clearCart() {
    this.cartService.clearCart();
  }

  // Update the quantity of a specific training in the cart
  updateQuantity(training: TrainingModel, quantity: number) {
    this.cartService.updateTrainingQuantityCart(training, quantity);
  }

  // Checks if a user is logged in
  isLoggedIn = () => {
    return this.userService.getUser();
  };

  /**
   * Places an order for the current user.
   * - Checks if the user is logged in
   * - Sends the order to the backend API
   * - Clears the cart after successful order
   */
  placeOrder() {
    const user = this.userService.getUser()!;

    if (!this.userService.isLoggedIn()) {
      alert('Vous devez être connecté');
      return;
    }

    const order = this.cartService.addOrder(user);

    this.apiOrderService.postOrder(order).subscribe(() => {
      alert('Commande faite avec succes');
    });
    this.cartService.clearCart();
  }
}

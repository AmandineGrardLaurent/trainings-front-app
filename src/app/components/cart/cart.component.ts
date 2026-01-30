import { Component, OnInit, effect } from '@angular/core';
import { TrainingModel } from '../../models/training/training.model';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart/cart.service';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-cart.component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  // Local array to hold the trainings in the cart
  listCartTrainings: TrainingModel[] = [];
  totalPrice: number = 0;

  constructor(
    private cartService: CartService,
    // private router: Router,
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

    // this.router.navigateByUrl('/trainings');
  }

  // Clear all trainings from the cart
  clearCart() {
    this.cartService.clearCart();
  }

  // Update the quantity of a specific training in the cart
  updateQuantity(training: TrainingModel, quantity: number) {
    this.cartService.updateTrainingQuantityCart(training, quantity);
  }
}

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

  constructor(
    private cartService: CartService,
    // private router: Router,
  ) {
    // Create an effect to automatically update listCartTrainings whenever the signal changes
    effect(() => {
      this.listCartTrainings = this.cartService.trainings();
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
}

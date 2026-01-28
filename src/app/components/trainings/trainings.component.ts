import { CartService } from '../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { TrainingModel } from '../../models/training/training.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trainings',
  standalone: true,
  templateUrl: './trainings.component.html',
  imports: [CommonModule],
})
export class TrainingsComponent implements OnInit {
  // Array to hold available trainings
  listTrainings: TrainingModel[] | undefined;

  constructor(
    private CartService: CartService,
    private router: Router,
  ) {}

  // Initialize the list of available trainings
  ngOnInit(): void {
    this.listTrainings = [
      {
        id: 1,
        name: 'Java',
        description: 'Formation Java SE 8 sur 5 jours',
        price: 1500,
        quantity: 1,
      },
      {
        id: 2,
        name: 'DotNet',
        description: 'Formation DotNet sur 3 jours',
        price: 1000,
        quantity: 1,
      },
      {
        id: 3,
        name: 'Python',
        description: 'Formation Python sur 5 jours',
        price: 1500,
        quantity: 1,
      },
      {
        id: 4,
        name: 'React',
        description: 'Formation React sur 2 jours',
        price: 800,
        quantity: 1,
      },
    ];
  }

  // Add the selected training to the cart and navigate to the cart page
  addToCart(training: TrainingModel) {
    this.CartService.addTraining(training);
    this.router.navigateByUrl('/cart');
  }
}

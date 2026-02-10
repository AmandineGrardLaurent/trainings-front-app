import { CartService } from '../../services/cart/cart.service';
import { Component, OnInit, signal, computed } from '@angular/core';
import { TrainingModel } from '../../models/training/training.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiTrainingService } from '../../services/api/api-training.service';

@Component({
  selector: 'app-trainings',
  standalone: true,
  templateUrl: './trainings.component.html',
  imports: [CommonModule],
})
export class TrainingsComponent implements OnInit {
  // Array to hold available trainings
  listTrainings = signal<TrainingModel[]>([]);
  searchText = signal('');

  // Filtered trainings (reactive)
  filteredTrainings = computed(() => {
    const search = this.searchText().toLowerCase();

    return this.listTrainings().filter(
      (training) =>
        training.name.toLowerCase().includes(search) ||
        training.description.toLowerCase().includes(search),
    );
  });

  constructor(
    private cartService: CartService,
    private router: Router,
    private apiTraining: ApiTrainingService,
  ) {}

  // Initialize the list of available trainings
  ngOnInit(): void {
    this.getAllTrainings();
  }

  getAllTrainings() {
    this.apiTraining.getTrainings().subscribe({
      next: (trainings) => this.listTrainings.set(trainings),
      error: (err) => console.error('Error fetching trainings:', err.message),
    });
  }

  // Add the selected training to the cart and navigate to the cart page
  addToCart(training: TrainingModel) {
    this.cartService.addTraining(training);
    this.router.navigateByUrl('/cart');
  }
}

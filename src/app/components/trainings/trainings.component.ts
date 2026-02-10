import { CartService } from '../../services/cart/cart.service';
import { Component, OnInit, signal, computed } from '@angular/core';
import { TrainingModel } from '../../models/training/training.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiTrainingService } from '../../services/api/api-training.service';

/**
 * Component responsible for displaying all available trainings.
 *
 * Handles:
 * - Fetching trainings from the backend
 * - Searching/filtering trainings by name or description
 * - Adding a training to the cart and navigating to the cart page
 */
@Component({
  selector: 'app-trainings',
  standalone: true,
  templateUrl: './trainings.component.html',
  imports: [CommonModule],
})
export class TrainingsComponent implements OnInit {
  // Signal holding the array of all available trainings
  listTrainings = signal<TrainingModel[]>([]);

  // Signal holding the current search text for filtering trainings
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

  /**
   * Constructor
   * @param cartService Service to manage the shopping cart
   * @param router Angular Router to navigate between pages
   * @param apiTraining Service to fetch trainings from the backend
   */
  constructor(
    private cartService: CartService,
    private router: Router,
    private apiTraining: ApiTrainingService,
  ) {}

  // Initialize the list of available trainings
  ngOnInit(): void {
    this.getAllTrainings();
  }

  // Fetches all trainings from the API and updates the listTrainings signal.
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

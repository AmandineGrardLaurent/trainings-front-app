import { TrainingModel } from './../training/training.model';
import { signal } from '@angular/core';

/**
 * Model representing a shopping cart
 */
export class CartModel {
  // Define a reactive signal that holds the list of trainings in the cart
  trainings = signal<TrainingModel[]>([]);

  /**
   * Add a training to the cart
   * @param training The training to add
   */
  addTraining(training: TrainingModel) {
    this.trainings.update((trainings) => [...trainings, training]);
  }

  /**
   * Remove a training from the cart
   * @param training The training to remove
   */
  removeTraining(training: TrainingModel) {
    this.trainings.update((trainings) => trainings.filter((t) => t.id !== training.id));
  }

  /**
   * Clear all trainings from the cart
   */
  clearCart() {
    this.trainings.set([]);
  }
}

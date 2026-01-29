import { TrainingModel } from './../training/training.model';
import { signal, computed } from '@angular/core';

/**
 * Model representing a shopping cart
 */
export class CartModel {
  // Define a reactive signal that holds the list of trainings in the cart
  trainings = signal<TrainingModel[]>([]);

  // Computed property to calculate the total price of the cart
  totalPrice = computed(() => this.trainings().reduce((sum, t) => sum + t.price * t.quantity, 0));

  /**
   * Add a training to the cart
   * @param training The training to add
   */
  addTraining(training: TrainingModel) {
    // Update the signal to include the new training
    this.trainings.update((trainings) => {
      // Check if the training already exists in the cart
      const index = trainings.findIndex((t) => t.id === training.id);
      if (index !== -1) {
        // Increment quantity
        const updated = [...trainings];
        updated[index] = {
          ...updated[index],
          quantity: updated[index].quantity + training.quantity,
        };
        return updated;
      }
      return [...trainings, training];
    });
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

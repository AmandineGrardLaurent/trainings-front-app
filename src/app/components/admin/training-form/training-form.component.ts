import { ApiTrainingService } from './../../../services/api/api-training.service';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

/**
 * Component responsible for adding a new training.
 *
 * Provides a form to create a training and communicates with the backend API.
 */
@Component({
  selector: 'app-training-form-component',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './training-form.component.html',
})
export class TrainingFormComponent {
  // Form group for the training form
  trainingForm: FormGroup;

  // Event emitted when a new training is successfully added
  @Output() trainingAdded = new EventEmitter<void>();

  /**
   * Constructor
   * @param fb FormBuilder to create reactive forms
   * @param apiTrainingService Service to communicate with the trainings API
   */
  constructor(
    private fb: FormBuilder,
    private apiTrainingService: ApiTrainingService,
  ) {
    // Initialize the form with default values
    this.trainingForm = this.fb.group({
      name: '',
      description: '',
      price: 0,
    });
  }

  /**
   * Adds a new training
   *
   * - Checks if the form is valid
   * - Sends the data to the backend via the API service
   * - Resets the form and emits `trainingAdded` to notify parent components
   */
  addTraining() {
    if (this.trainingForm.valid) {
      const formValue = { ...this.trainingForm.value };
      this.apiTrainingService.postTraining(formValue).subscribe({
        next: () => {
          alert('Nouvelle formation enregistrée !');

          // Reset the form after successful submission
          this.trainingForm.reset();

          // Notify parent components that a new training has been added
          this.trainingAdded.emit();
        },
        error: (err) => {
          console.error('Error adding training:', err);
          alert('Erreur lors de l`ajout de la formation. Veuillez réessayer.');
        },
      });
    }
  }
}

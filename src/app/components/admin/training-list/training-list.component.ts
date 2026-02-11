import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { TrainingModel } from '../../../models/training/training.model';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

/**
 * Component responsible for displaying a list of trainings.
 *
 * This component receives a list of trainings from a parent component
 * and emits events when a training needs to be deleted.
 */
@Component({
  selector: 'app-training-list',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './training-list.component.html',
})
export class TrainingListComponent {
  // List of trainings to display. Bound from the parent component.
  @Input() trainings: TrainingModel[] = [];

  // Event emitted when a training is requested to be deleted. Emits the training ID.
  @Output() deleteTraining = new EventEmitter<number>();

  // Event emitted when a training is updated. Emits the ID and updated data.
  @Output() updateTraining = new EventEmitter<{
    id: number;
    data: Partial<TrainingModel>;
  }>();

  // Holds the ID of the training currently being edited
  editTrainingId: number | null = null;

  // Form group used for editing a training
  editTrainingForm!: FormGroup;

  /**
   * Constructor
   * @param fb FormBuilder to create reactive forms
   */
  constructor(private fb: FormBuilder) {
    // Initialize the edit form with default values
    this.editTrainingForm = this.fb.group({
      name: [''],
      description: [''],
      price: [0],
    });
  }

  /**
   * Starts editing a training.
   *
   * - Sets the `editTrainingId` to the selected training
   * - Patches the current values into the form
   *
   * @param training The training to edit
   */
  startEdit(training: TrainingModel) {
    this.editTrainingId = training.id;

    this.editTrainingForm.patchValue({
      name: training.name,
      description: training.description,
      price: training.price,
    });
  }

  /**
   * Saves the changes made to the training.
   *
   * - Checks if the form is valid
   * - Emits the `updateTraining` event with the training ID and updated data
   * - Resets the `editTrainingId` to null
   *
   * @param trainingId The ID of the training being edited
   */
  saveEdit(trainingId: number) {
    if (this.editTrainingForm.invalid) return;

    this.updateTraining.emit({
      id: trainingId,
      data: this.editTrainingForm.value,
    });
    this.editTrainingId = null;
  }

  /**
   * Cancels the editing process.
   * Resets the `editTrainingId` to null so the form switches back to display mode.
   */
  cancelEdit() {
    this.editTrainingId = null;
  }
}

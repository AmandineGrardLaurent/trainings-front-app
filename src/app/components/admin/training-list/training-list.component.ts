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
  /**
   * List of trainings to display.
   * Provided by the parent component via property binding.
   */
  @Input() trainings: TrainingModel[] = [];

  /**
   * Event emitted when a training is requested to be deleted.
   * Emits the ID of the training.
   */
  @Output() deleteTraining = new EventEmitter<number>();

  @Output() updateTraining = new EventEmitter<{
    id: number;
    data: Partial<TrainingModel>;
  }>();

  editTrainingId: number | null = null;
  editTrainingForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.editTrainingForm = this.fb.group({
      name: [''],
      description: [''],
      price: [0],
    });
  }

  startEdit(training: TrainingModel) {
    this.editTrainingId = training.id;

    this.editTrainingForm.patchValue({
      name: training.name,
      description: training.description,
      price: training.price,
    });
  }

  saveEdit(trainingId: number) {
    if (this.editTrainingForm.invalid) return;

    this.updateTraining.emit({
      id: trainingId,
      data: this.editTrainingForm.value,
    });
    this.editTrainingId = null;
  }

  cancelEdit() {
    this.editTrainingId = null;
  }
}

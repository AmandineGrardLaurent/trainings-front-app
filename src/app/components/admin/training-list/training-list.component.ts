import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TrainingModel } from '../../../models/training/training.model';
import { CommonModule } from '@angular/common';

/**
 * Component responsible for displaying a list of trainings.
 *
 * This component receives a list of trainings from a parent component
 * and emits events when a training needs to be deleted.
 */
@Component({
  selector: 'app-training-list',
  imports: [CommonModule],
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
}

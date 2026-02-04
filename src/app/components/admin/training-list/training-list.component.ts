import { Component, Input } from '@angular/core';
import { TrainingModel } from '../../../models/training/training.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-training-list',
  imports: [CommonModule],
  templateUrl: './training-list.component.html',
})
export class TrainingListComponent {
  @Input() trainings: TrainingModel[] = [];
}

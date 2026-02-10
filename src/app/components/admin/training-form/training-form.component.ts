import { ApiTrainingService } from './../../../services/api/api-training.service';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-training-form-component',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './training-form.component.html',
})
export class TrainingFormComponent {
  trainingForm: FormGroup;
  @Output() trainingAdded = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private apiTrainingService: ApiTrainingService,
  ) {
    this.trainingForm = this.fb.group({
      name: '',
      description: '',
      price: 0,
    });
  }

  addTraining() {
    if (this.trainingForm.valid) {
      const formValue = { ...this.trainingForm.value };
      this.apiTrainingService.postTraining(formValue).subscribe(() => {
        alert('Nouvelle formation enregistrée !');
        this.trainingForm.reset();
        this.trainingAdded.emit();
      });
    }
  }
}

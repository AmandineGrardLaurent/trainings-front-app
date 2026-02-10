import { ApiTrainingService } from './../../../services/api/api-training.service';
import { ApiUserService } from './../../../services/api/api-user.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserModel } from '../../../models/user/user.model';
import { UserListComponent } from '../user-list/user-list.component';
import { TrainingListComponent } from '../training-list/training-list.component';
import { TrainingModel } from '../../../models/training/training.model';
import { TrainingFormComponent } from '../training-form/training-form.component';
import { CommonModule } from '@angular/common';

/**
 * Admin dashboard component
 *
 * Main component for managing users and trainings.
 * Allows displaying, deleting, and updating entities from the admin interface.
 */
@Component({
  selector: 'app-admin-dashboard.component',
  imports: [UserListComponent, TrainingListComponent, TrainingFormComponent, CommonModule],
  standalone: true,
  templateUrl: './admin-dashboard.component.html',
})
export class AdminDashboardComponent implements OnInit {
  // List of all users
  users: UserModel[] = [];

  // List of all trainings
  trainings: TrainingModel[] = [];

  /**
   * Constructor
   * @param apiUserService Service to communicate with the user API
   * @param cdr ChangeDetectorRef to manually trigger template updates
   * @param apiTrainingService Service to communicate with the training API
   */
  constructor(
    private apiUserService: ApiUserService,
    private cdr: ChangeDetectorRef,
    private apiTrainingService: ApiTrainingService,
  ) {}

  /**
   * Lifecycle hook called when the component is initialized.
   * Loads users and trainings from the API.
   */
  ngOnInit(): void {
    this.getUsers();
    this.getTrainings();
  }

  /**
   * Fetches all users from the API and updates the local users list.
   */
  getUsers() {
    this.apiUserService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error fetching users:', err.message),
    });
  }

  /**
   * Fetches all trainings from the API and updates the local trainings list.
   */
  getTrainings() {
    this.apiTrainingService.getTrainings().subscribe({
      next: (trainings) => {
        this.trainings = trainings;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error fetching trainings:', err.message),
    });
  }

  /**
   * Deletes a user both from the UI and the backend.
   *
   * @param id The ID of the user to delete
   */
  onDeleteUser(id: number) {
    this.users = this.users.filter((user) => user.id !== id);
    this.apiUserService.deleteUser(id).subscribe({
      next: () => {
        alert('Utilisateur supprimé avec succès');
      },
      error: (err) => console.error('Error deleting user:', err.message),
    });
  }

  /**
   * Deletes a training both from the UI and the backend.
   *
   * @param id The ID of the training to delete
   */
  onDeleteTraining(id: number) {
    this.trainings = this.trainings.filter((training) => training.id !== id);
    this.apiTrainingService.deleteTraining(id).subscribe({
      next: () => {
        alert('Formation supprimée avec succès');
      },
      error: (err) => console.error('Error deleting training:', err.message),
    });
  }

  /**
   * Updates a training after editing in the form.
   * @param event Object containing the training ID and the updated data
   */
  onUpdateTraining(event: { id: number; data: Partial<TrainingModel> }) {
    this.apiTrainingService.updateTraining(event.id, event.data).subscribe({
      next: (updated) => {
        // Find the index of the updated training in the local list
        const index = this.trainings.findIndex((training) => training.id === event.id);

        // If found, update it locally without reloading the whole page
        if (index !== -1) {
          this.trainings[index] = { ...this.trainings[index], ...updated };
        }

        this.cdr.detectChanges();
      },
      error: (err) => console.error(err),
    });
  }
}

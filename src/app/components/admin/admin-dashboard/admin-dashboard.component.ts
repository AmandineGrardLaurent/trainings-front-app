import { ApiTrainingService } from './../../../services/api/api-training.service';
import { ApiUserService } from './../../../services/api/api-user.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserModel } from '../../../models/user/user.model';
import { UserListComponent } from '../user-list/user-list.component';
import { TrainingListComponent } from '../training-list/training-list.component';
import { TrainingModel } from '../../../models/training/training.model';

/**
 * Admin dashboard component.
 */
@Component({
  selector: 'app-admin-dashboard.component',
  imports: [UserListComponent, TrainingListComponent],
  standalone: true,
  templateUrl: './admin-dashboard.component.html',
})
export class AdminDashboardComponent implements OnInit {
  // List of all users
  users: UserModel[] = [];

  // List of all trainings
  trainings: TrainingModel[] = [];

  // Creates an instance of AdminDashboardComponent
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
      error: (err) => console.error('Error fetching users:', err.message),
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
    console.log(this.trainings);
    this.apiTrainingService.deleteTraining(id).subscribe({
      next: () => {
        alert('Formation supprimée avec succès');
      },
      error: (err) => console.error('Error deleting training:', err.message),
    });
  }
}

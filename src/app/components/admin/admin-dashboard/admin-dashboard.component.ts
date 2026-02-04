import { ApiTrainingService } from './../../../services/api/api-training.service';
import { ApiUserService } from './../../../services/api/api-user.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserModel } from '../../../models/user/user.model';
import { UserListComponent } from '../user-list/user-list.component';
import { TrainingListComponent } from '../training-list/training-list.component';
import { TrainingModel } from '../../../models/training/training.model';

@Component({
  selector: 'app-admin-dashboard.component',
  imports: [UserListComponent, TrainingListComponent],
  standalone: true,
  templateUrl: './admin-dashboard.component.html',
})
export class AdminDashboardComponent implements OnInit {
  users: UserModel[] = [];
  trainings: TrainingModel[] = [];
  constructor(
    private apiUserService: ApiUserService,
    private cdr: ChangeDetectorRef,
    private apiTrainingService: ApiTrainingService,
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.getTrainings();
  }

  getUsers() {
    this.apiUserService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.cdr.detectChanges();
        console.log(this.users);
      },
      error: (err) => console.error('Error fetching users:', err.message),
    });
  }

  getTrainings() {
    this.apiTrainingService.getTrainings().subscribe({
      next: (trainings) => {
        this.trainings = trainings;
        this.cdr.detectChanges();
        console.log(this.trainings);
      },
      error: (err) => console.error('Error fetching users:', err.message),
    });
  }

  onDeleteUser(id: number) {
    this.users = this.users.filter((user) => user.id !== id);
    this.apiUserService.deleteUser(id).subscribe({
      next: () => {
        alert('Utilisateur supprimé avec succès');
      },
      error: (err) => console.error('Error deleting user:', err.message),
    });
  }

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

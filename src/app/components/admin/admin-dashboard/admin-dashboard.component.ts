import { ApiUserService } from './../../../services/api/api-user.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserModel } from '../../../models/user/user.model';
import { UserListComponent } from '../user-list/user-list.component';

@Component({
  selector: 'app-admin-dashboard.component',
  imports: [UserListComponent],
  standalone: true,
  templateUrl: './admin-dashboard.component.html',
})
export class AdminDashboardComponent implements OnInit {
  users: UserModel[] = [];
  constructor(
    private apiUserService: ApiUserService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.getUsers();
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

  onDeleteUser(id: number) {
    this.users = this.users.filter((user) => user.id !== id);
    this.apiUserService.deleteUser(id).subscribe({
      next: () => {
        alert('Utilisateur supprimé avec succès');
      },
      error: (err) => console.error('Error deleting user:', err.message),
    });
  }
}

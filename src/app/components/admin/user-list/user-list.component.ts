import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserModel } from '../../../models/user/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './user-list.component.html',
})
export class UserListComponent {
  @Input() users: UserModel[] = [];
  @Output() deleteUser = new EventEmitter<number>();
}

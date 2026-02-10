import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserModel } from '../../../models/user/user.model';
import { CommonModule } from '@angular/common';

/**
 * Component responsible for displaying a list of users.
 *
 * This component receives a list of users from a parent component
 * and emits events when a user needs to be deleted.
 */
@Component({
  selector: 'app-user-list',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './user-list.component.html',
})
export class UserListComponent {
  /**
   * List of users to display.
   * Provided by the parent component via property binding.
   */
  @Input() users: UserModel[] = [];

  /**
   * Event emitted when a user is requested to be deleted.
   * Emits the ID of the user.
   */
  @Output() deleteUser = new EventEmitter<number>();
}

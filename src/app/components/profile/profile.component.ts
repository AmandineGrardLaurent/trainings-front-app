import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserModel } from '../../models/user/user.model';
import { UserService } from '../../services/user/user.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiOrderService } from '../../services/api/api-order.service';
import { OrderModel } from '../../models/order/order.model';
import { OrdersComponent } from '../orders/orders.component';

/**
 * Component responsible for displaying the user profile and the user's orders.
 *
 * Handles:
 * - Displaying the current user information
 * - Fetching and displaying the user's orders
 * - Logging out the user
 */
@Component({
  selector: 'app-profile.component',
  imports: [CommonModule, OrdersComponent],
  templateUrl: './profile.component.html',
  standalone: true,
})
export class ProfileComponent implements OnInit {
  // Local variable to hold the current value of the user
  userValue: UserModel | null = null;

  // List of orders associated with the current user
  listOrders: OrderModel[] = [];

  /**
   * Constructor
   * @param userService Service that manages the user session and authentication
   * @param router Angular Router for navigation
   * @param apiOrderService Service to interact with the backend for orders
   * @param cdr ChangeDetectorRef to manually trigger UI updates
   */
  constructor(
    private userService: UserService,
    private router: Router,
    private apiOrderService: ApiOrderService,
    private cdr: ChangeDetectorRef,
  ) {
    // Initialize the local user value from the UserService
    this.userValue = this.userService.getUser();
  }

  /**
   * Lifecycle hook called when the component is initialized.
   * Fetches the orders for the currently logged-in user.
   */
  ngOnInit(): void {
    const userId = this.userService.getUserId();
    this.getOrders(Number(userId));
  }

  /**
   * Logs out the current user.
   * Clears the session, shows a confirmation, and navigates to the home page.
   */
  logout() {
    this.userService.logoutUser();
    alert('Déconnexion réussie !');
    this.router.navigateByUrl('/');
  }

  /**
   * Fetches all orders for a specific user.
   * @param userId The ID of the user whose orders should be fetched
   */
  getOrders(userId: number) {
    this.apiOrderService.getOrdersByUser(userId).subscribe({
      next: (listOrders) => {
        this.listOrders = listOrders;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error fetching orders:', err.message),
    });
  }
}

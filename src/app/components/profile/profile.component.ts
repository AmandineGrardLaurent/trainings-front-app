import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserModel } from '../../models/user/user.model';
import { UserService } from '../../services/user/user.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiOrderService } from '../../services/api/api-order.service';
import { OrderModel } from '../../models/order/order.model';
import { OrdersComponent } from '../orders/orders.component';

@Component({
  selector: 'app-profile.component',
  imports: [CommonModule, OrdersComponent],
  templateUrl: './profile.component.html',
  standalone: true,
})
export class ProfileComponent implements OnInit {
  // Local variable to hold the current value of the user
  userValue: UserModel | null = null;
  listOrders: OrderModel[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private apiOrderService: ApiOrderService,
    private cdr: ChangeDetectorRef,
  ) {
    this.userValue = this.userService.getUser();
  }

  ngOnInit(): void {
    const userId = this.userService.getUserId();
    this.getOrders(Number(userId));
  }

  logout() {
    this.userService.logoutUser();
    alert('Déconnexion réussie !');
    this.router.navigateByUrl('/');
  }

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

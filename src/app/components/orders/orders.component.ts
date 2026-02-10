import { OrderModel } from '../../models/order/order.model';
import { Component, Input } from '@angular/core';
import { TrainingModel } from '../../models/training/training.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders-component',
  imports: [CommonModule],
  templateUrl: './orders.component.html',
})
export class OrdersComponent {
  @Input() listOrders: OrderModel[] = [];
}

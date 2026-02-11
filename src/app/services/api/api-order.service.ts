import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { OrderModel } from '../../models/order/order.model';

/**
 * Service responsible for all HTTP requests related to orders.
 *
 * This service communicates directly with the backend API
 * and does not contain any application state or business logic.
 */
@Injectable({
  providedIn: 'root',
})
export class ApiOrderService {
  // Constructor injecting Angular HttpClient.
  constructor(private http: HttpClient) {}

  // Creates a new order in the database
  public postOrder(order: Partial<OrderModel>) {
    return this.http.post<OrderModel>(`${environment.apiUrl}/orders`, order);
  }

  // Fetches a single order by its unique identifier.
  public getOrder(id: number) {
    return this.http.get<OrderModel>(`${environment.apiUrl}/orders/${id}`);
  }

  // Fetches all orders from the backend.
  public getOrders() {
    return this.http.get<OrderModel[]>(`${environment.apiUrl}/orders`);
  }

  // Fetches all orders associated with a specific user.
  public getOrdersByUser(userId: number) {
    return this.http.get<OrderModel[]>(`${environment.apiUrl}/orders?user.id=${userId}`);
  }
}

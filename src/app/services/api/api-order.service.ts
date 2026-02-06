import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { OrderModel } from '../../models/order/order.model';

@Injectable({
  providedIn: 'root',
})
export class ApiOrderService {
  // Constructor injecting Angular HttpClient.
  constructor(private http: HttpClient) {}

  // Creates a new order in the database
  public postOrder(order: OrderModel) {
    return this.http.post<OrderModel>(`${environment.apiUrl}/orders`, order);
  }
}

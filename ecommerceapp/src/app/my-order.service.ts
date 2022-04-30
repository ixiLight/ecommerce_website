import { Order } from './order';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class MyOrderService {
  // N: Order (angular.io)
  myOrders : Order[] = [];


  private apiServerUrl = environment.backendURL;
  orders: Order[] = [];
  items: Product[] = [];

  constructor(
    private http: HttpClient
    ) {}

  // N: Order (angular.io)
  isPurchase(purchase: Order) {
    this.myOrders.push(purchase);
  }
  getPurchasedItems() {
    return this.myOrders;
  }

  public getOrders():Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiServerUrl}/order/all`);
  }

  public addOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.apiServerUrl}/order/add`, order);
  }

  public updateOrder(order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.apiServerUrl}/order/update`, order);
  }

  public deleteOrder(orderId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/order/delete/${orderId}`);
  }
}

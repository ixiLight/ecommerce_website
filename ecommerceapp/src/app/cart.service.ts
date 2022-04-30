import { Injectable } from '@angular/core';
import { Product } from './product';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from './order';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: Product[] = [];
  private apiServerUrl = environment.backendURL;

  constructor(
    private http: HttpClient
  ) {}

  addToCart(product: Product) :void {
    this.items.push(product);
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }

  isPurchase(): Observable<any> {
    const url = `${this.apiServerUrl}/order`;
    return this.http.post(url, null).pipe();
}


public addOrder(order: Order): Observable<Order> {
  return this.http.post<Order>(`${this.apiServerUrl}/order/add`, order);
}

}

import { MyOrderService } from './../my-order.service';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from '../product';
import {Router} from '@angular/router';
import { Order } from '../order';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  // items: any;
  item: Product[] = [];
  public cart: Product[] = [];
  public order: Order[] = [];

  items = this.cartService.getItems();


  public addOrder: Order = {
    id: 0,
    orderCode: '',
    orderNumber: '',
    productCount: 0,
    status: '',
    totalCost: 0,
    productId: 0,
    quantity: 0,
    price: 0
  };

  constructor(
    private cartService: CartService,
    private router: Router,
    private myOrderService: MyOrderService,
  ) { }
  
  ngOnInit(): void {

  }

  // N: Order (angular.io)
  isPurchase(purchase: any) {
    this.myOrderService.isPurchase(purchase);
    window.alert('Successfully Purchased!');
  }


}
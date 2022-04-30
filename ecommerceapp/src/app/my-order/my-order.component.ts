import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { Order } from '../order';
import { MyOrderService } from '../my-order.service';
import { HttpErrorResponse } from '@angular/common/http';

import { User } from 'src/app/user';
import { UserService } from 'src/app/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {

  items : Product[] = [];
  public orders: Order[] = []; //BE
  currentUser : User | null = null;


  // N: Order(angular.io)
  myOrder = this.myOrderService.getPurchasedItems();


  // BE Order
  public editOrder: Order= {
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
  public deleteOrder: Order = {
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
    private myOrderService: MyOrderService,
    private userService:UserService, 

    ) { }

  ngOnInit(): void {
    this.getOrders();
    this.currentUser = this.userService.getCurrentUser();

  }

  // N: Order (angular.io)
  isPurchase(purchase: any) {
    this.myOrderService.isPurchase(purchase);
    window.alert('Successfully Purchased!');
  }

  public getOrders(): void {
    this.myOrderService.getOrders().subscribe(
      (response: Order[]) => {
        this.orders = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddOrder(addForm: NgForm): void {
    document.getElementById('add-order-form')!.click();
    this.myOrderService.addOrder(addForm.value).subscribe(
      (response: Order) => {
        console.log(response);
        this.getOrders();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    )
  }

}

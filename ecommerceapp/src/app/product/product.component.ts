import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductService } from 'src/app/product.service';
import { Product } from 'src/app/product';
import { UserService } from 'src/app/user.service';
import { User } from 'src/app/user';
import { Categories } from 'src/app/categories';
import { ActivatedRoute } from '@angular/router';

import { CartService } from '../cart.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

   public products: Product[] = [];
   currentUser : User | null = null;
   category: Categories[] = [];


  public editProduct: Product= {
    id: 0,
    name: '',
    description: '',
    price: '',
    icon: '',
    productCode: '',
    quantity: 0,
    category_id: 0,
    categoryId: 0
  };  
  public deleteProduct: Product = {
    id: 0,
    name: '',
    description: '',
    price: '',
    icon: '',
    productCode: '',
    quantity: 0,
    category_id: 0,
    categoryId: 0
  };
  public addProduct: Product = {
    id: 0,
    name: '',
    description: '',
    price: '',
    icon: '',
    productCode: '',
    quantity: 0,
    category_id: 0,
    categoryId: 0
  };
  
  constructor(
    private productService: ProductService, 
    private userService:UserService, 
    private cartService:CartService,
    private route: ActivatedRoute,

    ) { }

  ngOnInit(): void {
      this.getProducts();
      this.currentUser = this.userService.getCurrentUser();

  }
  public getProducts(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.productService.getProducts().subscribe(
      (response: Product[]) => {
        this.products = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddProduct(addForm: NgForm): void {
    document.getElementById('add-product-form')!.click();
    this.productService.addProduct(addForm.value).subscribe(
      (response: Product) => {
        console.log(response);
        this.getProducts();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    )
  }

  public onUpdateProduct(product: Product): void {
    this.productService.updateProduct(product).subscribe(
      (response: Product) => {
        console.log(response);
        this.getProducts();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    )
  }

  public onDeleteProduct(productId: number): void {
    this.productService.deleteProduct(productId).subscribe(
      (response: void) => {
        console.log(response);
        this.getProducts();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    )
  }

  public searchProducts(key: string): void {
    console.log(key);
    const results: Product[] = [];
    for (const product of this.products) {
      if (product.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || product.description.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || product.price.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(product);
      }
    }
    this.products = results;
    if (results.length === 0 || !key) {
      this.getProducts();
    }
  }

  public onOpenModal(product: Product, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      this.addProduct = product;
      button.setAttribute('data-target', '#addProductModal');
    }
    if (mode === 'edit') {
      this.editProduct = product;
      button.setAttribute('data-target', '#updateProductModal');
    }
    if (mode === 'delete') {
      this.deleteProduct = product;
      button.setAttribute('data-target', '#deleteProductModal');
    }

    container?.appendChild(button);
    button.click();
    
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    console.log("Added to Cart")
    window.alert('Your product has been added to the cart!');
  }
}

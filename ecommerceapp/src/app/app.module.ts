import { filter } from 'rxjs';
import { CategoryComponent } from './category/category.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CategoriesService } from './categories.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { MenuComponent } from './menu/menu.component';

import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { MyProfileComponent } from './my-profile/my-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserSignupComponent,
    WelcomePageComponent,
    MenuComponent,
    ProductComponent,
    CategoryComponent,
    CartComponent,
    MyOrderComponent,
    ThankyouComponent,
    MyProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [CategoriesService],
  bootstrap: [AppComponent, ProductComponent]
})
export class AppModule { }

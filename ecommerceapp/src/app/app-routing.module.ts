import { ThankyouComponent } from './thankyou/thankyou.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { CategoryComponent } from './category/category.component';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { ProductComponent } from './product/product.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { MyProfileComponent } from './my-profile/my-profile.component';

const routes: Routes = [
  {path:'', redirectTo:'user-login', pathMatch:'full'},
  {path:'user-login', component:UserLoginComponent},
  {path:'user-signup', component:UserSignupComponent},
  {path:'welcome-page', component:WelcomePageComponent},
  {path: 'product', component: ProductComponent},
  {path: 'category/:id', component: ProductComponent},
  {path: 'category', component: CategoryComponent},
  {path: 'cart', component: CartComponent},
  {path: 'my-order', component: MyOrderComponent},
  {path: 'thankyou', component: ThankyouComponent},
  {path: 'my-profile', component: MyProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }




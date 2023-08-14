import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivateGuard } from './helper/can-activate.guard';

const routes: Routes = [
  {
    path: '',
    title: 'Welcome | E-com',
    loadChildren: () =>
      import('./auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'home',
    title: 'Home | E-com',
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule)
  },
  {
    path: 'products',
    title: 'Products | E-com',
    loadChildren: () =>
      import('./modules/products/products.module').then((m) => m.ProductsModule)
  },
  {
    path: 'cart',
    title: 'My Cart | E-com',
    loadChildren: () =>
      import('./modules/cart/cart.module').then((m) => m.CartModule)
  },
  {
    path: 'all-products',
    canActivate: [canActivateGuard],
    title: 'All Products | E-com',
    loadChildren: () =>
      import('./modules/manage-product/manage-product.module').then((m) => m.ManageProductModule)
  },
  {
    path: 'checkout',
    title: 'Checkout | E-com',
    loadChildren: () =>
      import('./modules/checkout/checkout.module').then((m) => m.CheckoutModule)
  },
  {
    path: 'my-orders',
    title: 'Orders | E-com',
    loadChildren: () =>
      import('./modules/order-history/order-history.module').then((m) => m.OrderHistoryModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { SharedModule } from 'src/shared/shared.module';
import { ProductListComponent } from './components/product-list/product-list.component';
import { MaterialModule } from 'src/shared/modules/material.module';
import { ProductInfoComponent } from './components/product-info/product-info.component';
import { CartService } from '../cart/service/cart.service';


@NgModule({
  declarations: [
    ProductListComponent,
    ProductInfoComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    MaterialModule
  ],
  providers: [CartService]
})
export class ProductsModule { }

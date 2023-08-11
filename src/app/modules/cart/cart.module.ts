import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { MaterialModule } from 'src/shared/modules/material.module';
import { SharedModule } from 'src/shared/shared.module';
import { CartService } from './service/cart.service';


@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    MaterialModule,
    SharedModule
  ],
  providers: [CartService]
})
export class CartModule { }

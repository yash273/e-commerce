import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CartService } from '../cart/service/cart.service';
import { CheckoutComponent } from './checkout.component';
import { SharedModule } from 'src/shared/shared.module';
import { MaterialModule } from 'src/shared/modules/material.module';


@NgModule({
  declarations: [
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CheckoutRoutingModule,
    MaterialModule
  ],
  providers: [CartService]

})
export class CheckoutModule { }

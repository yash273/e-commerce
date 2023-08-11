import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageProductRoutingModule } from './manage-product-routing.module';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { AddEditProductsComponent } from './components/add-edit-products/add-edit-products.component';
import { MaterialModule } from 'src/shared/modules/material.module';
import { SharedModule } from 'src/shared/shared.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CartService } from '../cart/service/cart.service';


@NgModule({
  declarations: [
    AllProductsComponent,
    AddEditProductsComponent
  ],
  imports: [
    CommonModule,
    ManageProductRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule

  ],
  providers: [CartService]
})
export class ManageProductModule { }

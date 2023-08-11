import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/shared/shared.module';
import { MaterialModule } from 'src/shared/modules/material.module';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CartService } from '../cart/service/cart.service';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    MaterialModule,
    CarouselModule.forRoot()

  ],
  providers: [CartService]
})
export class HomeModule { }

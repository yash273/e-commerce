import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './modules/material.module';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { TruncatePipe } from './pipes/truncate.pipe';
import { DeleteComponent } from './components/delete/delete.component';
import { SharedService } from './services/shared.service';
import { AlertComponent } from './components/alert/alert.component';
import { CartService } from 'src/app/modules/cart/service/cart.service';
import { ViewOrdersComponent } from './components/view-orders/view-orders.component';



@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    TruncatePipe,
    DeleteComponent,
    AlertComponent,
    ViewOrdersComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    CarouselModule.forRoot()
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    TruncatePipe
  ],
  providers: [
    SharedService,
    CartService
  ]
})
export class SharedModule { }

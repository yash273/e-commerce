import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderHistoryRoutingModule } from './order-history-routing.module';
import { OrderHistoryComponent } from './order-history.component';
import { SharedModule } from 'src/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/shared/modules/material.module';
import { OrderHistoryService } from './service/order-history.service';


@NgModule({
  declarations: [
    OrderHistoryComponent
  ],
  imports: [
    CommonModule,
    OrderHistoryRoutingModule,
    MaterialModule,
    FormsModule,
    SharedModule
  ],
  providers: [OrderHistoryService]

})
export class OrderHistoryModule { }

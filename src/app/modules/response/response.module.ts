import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResponseRoutingModule } from './response-routing.module';
import { ResponseComponent } from './response.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/shared/modules/material.module';
import { SharedModule } from 'src/shared/shared.module';

import { DevExtremeModule } from 'src/shared/modules/dev-extreme.module'

@NgModule({
  declarations: [
    ResponseComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    SharedModule,
    ResponseRoutingModule,
    DevExtremeModule
  ]
})
export class ResponseModule { }

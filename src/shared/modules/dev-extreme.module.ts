import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxButtonModule } from 'devextreme-angular';
import { DxDataGridModule } from 'devextreme-angular';
const DevModules = [
  DxButtonModule,
  DxDataGridModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DevModules
  ],
  exports: [
    DevModules
  ]
})
export class DevExtremeModule { }

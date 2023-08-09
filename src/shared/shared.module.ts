import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './modules/material.module';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { TruncatePipe } from './pipes/truncate.pipe';



@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    TruncatePipe,
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
  ]
})
export class SharedModule { }

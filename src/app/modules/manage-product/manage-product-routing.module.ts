import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { AddEditProductsComponent } from './components/add-edit-products/add-edit-products.component';

const routes: Routes = [
  {
    path: '',
    component: AllProductsComponent
  },
  {
    path: 'add',
    component: AddEditProductsComponent
  },
  {
    path: 'edit',
    component: AddEditProductsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageProductRoutingModule { }

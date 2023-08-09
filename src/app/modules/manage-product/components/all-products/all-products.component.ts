import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HomeService } from 'src/app/modules/home/service/home.service';
import { ManageProductService } from '../../service/manage-product.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'name', 'image', 'category', 'action'];
  pageSizeOption = [5, 10, 20];
  itemsPerPage = this.pageSizeOption[0];
  currentPage = 1;

  pageSize: number = this.itemsPerPage
  totalItems: number = 100;


  constructor(
    private homeService: HomeService,
    private manageProductService: ManageProductService
  ) {

  }

  ngOnInit(): void {
    this.getProductsData()
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.itemsPerPage = event.pageSize;
    this.getProductsData();
  }

  getProductsData() {
    this.manageProductService.getProductList(this.currentPage, this.itemsPerPage).subscribe((res: any) => {
      this.dataSource.data = res;
      this.totalItems = 100;
    })
  }
}

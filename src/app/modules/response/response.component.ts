import { Component, OnInit } from '@angular/core';
import { ResponseService } from './service/response.service';
import DataSource from 'devextreme/data/data_source';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.scss']
})
export class ResponseComponent implements OnInit {

  dataSource!: DataSource;
  columns: any[] = [
    { dataField: 'AllocationName', caption: 'AllocationName' },
    { dataField: 'AllocationType', caption: 'AllocationType' },
    { dataField: 'StartDate', caption: 'StartDate' },
    { dataField: 'EndDate', caption: 'EndDate' },
    { dataField: 'AllocatedAmount', caption: 'AllocatedAmount' },
    { dataField: 'Active', caption: 'Active' },
    { dataField: 'CrisisMaxAmount', caption: 'CrisisMaxAmount' },
    { dataField: 'AgencyName', caption: 'AgencyName' },
    { dataField: 'ProgramCode', caption: 'ProgramCode' },
    { dataField: 'FederalFiscalYear', caption: 'FederalFiscalYear' },
    { dataField: 'MaxAdditionalBenefit', caption: 'MaxAdditionalBenefit' },
    { dataField: 'NoServiceBudgetLimit', caption: 'NoServiceBudgetLimit' },
    { dataField: 'AllowMultipleTimes', caption: 'AllowMultipleTimes' },
    { dataField: 'VendorDeliveryTracking', caption: 'VendorDeliveryTracking' },


  ];

  constructor(
    private responseService: ResponseService
  ) {

  }

  ngOnInit(): void {
    this.responseService.getAllocationsList().subscribe((res: any) => {
      console.log(res)
      this.dataSource = res;
    })
  }
}

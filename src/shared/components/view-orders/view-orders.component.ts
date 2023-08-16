import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderHistoryService } from 'src/app/modules/order-history/service/order-history.service';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.scss']
})
export class ViewOrdersComponent {

  constructor(
    public dialogRef: MatDialogRef<ViewOrdersComponent>,

    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    console.log(data);
  }

}

import { Injectable } from '@angular/core';
import { DeleteComponent } from '../components/delete/delete.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertComponent } from '../components/alert/alert.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ViewOrdersComponent } from '../components/view-orders/view-orders.component';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }


  openDeleteDialog(message: string, title: string, data?: any) {
    return this.dialog.open(DeleteComponent, {
      width: '400px',
      disableClose: true,
      data: { warning: message, title: title, data: data }
    });
  }

  openViewOrders(data: any) {
    return this.dialog.open(ViewOrdersComponent, {
      width: '600px',
      disableClose: false,
      data
    });
  }

  showAlert(message: string, alertType: 'default' | 'error' | 'success') {
    this.snackBar.openFromComponent(AlertComponent, {
      data: {
        message: message,
      },
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: alertType
    })
  }

}

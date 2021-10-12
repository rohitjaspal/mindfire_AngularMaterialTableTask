import { Injectable } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DialogComponent } from './dialog/dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}
  public Modeldata(data: any = []): Observable<any> {
    var dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'add-more-pop';
    dialogConfig.data = data;
    let dialogRef: MatDialogRef<DialogComponent>;
    dialogRef = this.dialog.open(DialogComponent, dialogConfig);
    return dialogRef.afterClosed();
  }
}

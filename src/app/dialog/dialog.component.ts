import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  subject: Array<any>;
  name: Array<any>;
  descriptionname: string;
  description: string;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  dataarr: any = [];
  descriptionname: string;
  description: string;
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.description = data.description;
    this.descriptionname = data.descriptionname;
  }

  onClose(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {}
}

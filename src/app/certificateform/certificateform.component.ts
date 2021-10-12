import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { DialogService } from '../dialog.service';

@Component({
  selector: 'app-certificateform',
  templateUrl: './certificateform.component.html',
  styleUrls: ['./certificateform.component.css'],
})
export class CertificateformComponent implements OnInit, OnChanges {
  checkInUseEmail: any;
  checkPassword: any;
  post: any;
  formGroup: any;
  message: any = [];
  subject: any;
  name: any;
  constructor(
    private fm: FormBuilder,
    private datasvc: DataService,
    private model: DialogService
  ) {
    this.formGroup = this.fm.group({
      descriptionname: [null, Validators.required],
      description: [
        null,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(10),
        ],
      ],
      subject: [],
      name: [],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    changes;
  }

  ngOnInit() {
    this.datasvc.receiveMessage().subscribe((val) => {
      if (val != undefined) {
        let datapresent = val.filter((element: any) => {
          return element.subject;
        });
        let namedata = val.filter((element: any) => {
          return element.name;
        });

        if (datapresent.length > 0) {
          this.subject = val.map((a: any) => a.subject);

          this.formGroup.get('subject').patchValue(this.subject);
        } else if (namedata.length > 0) {
          this.name = val.map((a: any) => a.name);

          this.formGroup.get('name').patchValue(this.name);
        }
      }
    });
  }

  getErrorDescriptionName() {
    return this.formGroup.get('descriptionname').hasError('required')
      ? 'Description Name is required'
      : '';
  }

  onSubmit(post: any) {
    this.model.Modeldata(post).subscribe((res) => {});
  }
}

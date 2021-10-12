import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { DataService } from '../data.service';
import { MatSort, Sort } from '@angular/material/sort';

export interface PeriodicElement {
  name: string;
  position: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Karan' },
  { position: 2, name: 'Rohit' },
  { position: 3, name: 'Lalit' },
  { position: 4, name: 'Bhuvesh' },
  { position: 5, name: 'Vikram' },
  { position: 6, name: 'Deepak' },
  { position: 7, name: 'Kashish' },
  { position: 8, name: 'Pankaj' },
  { position: 9, name: 'Sachin' },
  { position: 10, name: 'Dharamveer' },
];
const SUBJECT: Elements[] = [
  { position: 1, subject: 'Maths' },
  { position: 2, subject: 'English' },
  { position: 3, subject: 'Computer science' },
  { position: 4, subject: 'Social studies' },
  { position: 5, subject: 'Mechatronics' },
  { position: 6, subject: 'Networks' },
  { position: 7, subject: 'Data structure' },
  { position: 8, subject: 'Rocket Science' },
  { position: 9, subject: 'Hindi' },
  { position: 10, subject: 'Chemistry' },
];
export interface Elements {
  subject: string;
  position: number;
}

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css'],
})
export class CertificateComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['select', 'position', 'name'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  dataSource2 = new MatTableDataSource<Elements>(SUBJECT);
  displayedColumnsTwo: string[] = ['select', 'position', 'subject'];
  data: any = [];
  isVisible = false;
  positionFilter = new FormControl();
  nameFilter = new FormControl();
  positionFilters = new FormControl();
  subjectFilter = new FormControl();
  globalFilter = '';
  filteredValues = { position: '', name: '' };
  filteredVal = { position: '', subject: '' };
  data1: any = [];
  name = 'subject';

  @ViewChild('paginator', { static: false }) paginator:
    | MatPaginator
    | undefined;
  @ViewChild('paginator2', { static: false }) paginator2:
    | MatPaginator
    | undefined;
  @ViewChild('sort1', { read: MatSort, static: true })
  sort1!: MatSort;
  @ViewChild('sort2', { read: MatSort, static: true })
  sort2!: MatSort;
  nameSource: any;
  sortedData: Elements[];

  constructor(private datasvc: DataService) {
    this.sortedData = SUBJECT.slice();
  }

  ngOnInit() {
    this.positionFilter.valueChanges.subscribe((positionFilterValue) => {
      this.filteredValues['position'] = positionFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.nameFilter.valueChanges.subscribe((nameFilterValue) => {
      this.filteredValues['name'] = nameFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.subjectFilter.valueChanges.subscribe((subjectFilterValue) => {
      this.filteredVal['subject'] = subjectFilterValue;
      this.dataSource2.filter = JSON.stringify(this.filteredVal);
    });

    this.positionFilters.valueChanges.subscribe((positionFilterValue) => {
      this.filteredVal['position'] = positionFilterValue;
      this.dataSource2.filter = JSON.stringify(this.filteredVal);
    });

    this.dataSource.filterPredicate = this.customFilterPredicate();
    this.dataSource2.filterPredicate = this.customFilterPredicate2();
    this.dataSource.sort = this.sort1;
    this.dataSource2.sort = this.sort2;
    const sortState: Sort = { active: 'name', direction: 'desc' };
    this.sort2.active = sortState.active;
    this.sort2.direction = sortState.direction;
    this.sort2.sortChange.emit(sortState);
  }
  ngAfterViewInit() {
    if (this.paginator && this.paginator2) {
      this.dataSource.paginator = this.paginator;
      this.dataSource2.paginator = this.paginator2;
    }
  }

  applyFilter(event: any) {
    this.globalFilter = event;
    this.dataSource.filter = JSON.stringify(this.filteredValues);
  }

  sortData(sort: Sort) {
    //this.dataSource2.sort = this.sort2;
    const data = SUBJECT.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b): any => {
      const isAsc = sort.direction === 'asc';
      // const isDesc = sort.direction === 'desc';
      //if(isAsc){
      switch (sort.active) {
        case 'position':
          return this.compare(a.position, b.position, isAsc);
        case 'subject':
          return this.compare(a.subject, b.subject, isAsc);
        default:
          return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
  compare2(a: number | string, b: number | string, isDesc: boolean) {
    return (a < b ? -1 : 1) * (isDesc ? 1 : -1);
  }

  getCheckboxesData(row: any) {
    if (row.checked == true) {
      this.data.push(row);
      this.sendMessage(this.data);
    } else if (row.checked == false) {
      this.data = this.data.filter((element: any) => {
        return element.checked === true;
      });
      this.sendMessage(this.data);
    } else {
      return;
    }
  }

  // This function will be used for getting selected row data from table
  getSecondCheckboxesData(row: any) {
    if (row.checked == true) {
      this.data1.push(row);
      this.sendMessage(this.data1);
    } else if (row.checked == false) {
      this.data1 = this.data1.filter((element: any) => {
        return element.checked === true;
      });
      this.sendMessage(this.data1);
    } else {
      return;
    }
  }
  sendMessage(message: any) {
    this.datasvc.sendMessage(message);
  }

  customFilterPredicate() {
    const myFilterPredicate = function (
      data: PeriodicElement,
      filter: string
    ): boolean {
      let searchString = JSON.parse(filter);
      return (
        data.position
          .toString()
          .trim()
          .indexOf(searchString.position.toLowerCase()) !== -1 &&
        data.name
          .toString()
          .trim()
          .toLowerCase()
          .indexOf(searchString.name.toLowerCase()) !== -1
      );
    };
    return myFilterPredicate;
  }
  customFilterPredicate2() {
    const myFilterPredicates = function (
      data: Elements,
      filter: string
    ): boolean {
      let searchString = JSON.parse(filter);
      return (
        data.position
          .toString()
          .trim()
          .indexOf(searchString.position.toLowerCase()) !== -1 &&
        data.subject
          .toString()
          .trim()
          .toLowerCase()
          .indexOf(searchString.subject.toLowerCase()) !== -1
      );
    };
    return myFilterPredicates;
  }
}

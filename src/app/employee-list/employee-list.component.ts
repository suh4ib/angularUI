import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { InputService } from '../services/input.service';
import { Employee } from '../_models/employee';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  loading = true;
  employees = new Array<Employee>();
  employee;
  selectedEmployee;
  addSubs: Subscription;
  attendanceSubs: Subscription;
  searchOptions: any[];
  selectedSearchOption: any;
  searchText;
  @ViewChild('dt') table: Table;

  constructor(
    private inputService: InputService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.employee = new Employee();
    this.employee.id = '1';
    this.employee.name = 'suhaib';
    this.employee.role = 'co-owner';
    this.employee.type = 'full time';
    this.employees.push(this.employee);
    this.employee = new Employee();
    this.employee.id = '2';
    this.employee.name = 'karan';
    this.employee.role = 'co-owner';
    this.employee.type = 'part time';
    this.employees.push(this.employee);

    this.searchOptions = [
      {name: 'Name',value:'name'},
      {name: 'Role',value:'role'},
      {name: 'Type',value:'type'}
  ];
  }

  ngOnInit(): void {
    this.loading = false;
    this.addSubs = this.inputService.employeeFormDialogClosed.subscribe(() => {
      this.router.navigate(['employees']);
      console.log('close-event');
    });

    this.attendanceSubs = this.inputService.employeeAttendanceSideBarClosed.subscribe(
      () => {
        this.router.navigate(['employees']);
        console.log('close-event-attendance');
      }
    );    
  }

  optionChangeEvent() {
    this.table.reset();
  }

  onActivityChange(event) {
    this.table.filter(event.target.value, this.selectedSearchOption.value, 'contains');  
}

  ngOnDestroy(): void {
    this.addSubs.unsubscribe();
    this.attendanceSubs.unsubscribe();
  }

  onAdd() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }

  onEdit() {
    this.router.navigate(['edit'], {
      queryParams: { employeeId: 1 },
      relativeTo: this.route,
    });
  }

  onView() {
    this.router.navigate(['view'], {
      queryParams: { employeeId: 1 },
      relativeTo: this.route,
    });
  }

  onViewAttendance() {
    console.log('view attendance is clicked');
    this.router.navigate(['attendance'], {
      queryParams: { employeeId: 1 },
      relativeTo: this.route,
    });
  }

  getEmployeeList() {}
}

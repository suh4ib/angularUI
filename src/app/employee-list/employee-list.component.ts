import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { EmployeeService } from '../_services/employee.service';
import { Employee } from '../_models/employee';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Table } from 'primeng/table';
import { map,tap } from 'rxjs/operators'
import * as _ from 'lodash';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit, OnDestroy {

  loading: boolean = true;
  employees = new Array<Employee>();
  employees1 = new Array<Employee>();
  employee:Employee;
  selectedEmployee;
  len;
  // employees$: Observable<Employee[]>;
  
  addSubs: Subscription;
  attendanceSubs: Subscription;
  viewSubs: Subscription;
  editSubs: Subscription;

  searchOptions: any[];
  selectedSearchOption: any;
  searchText;
  
  @ViewChild('dt') table: Table;

  constructor(private employeeService: EmployeeService, private router: Router, private activatedRoute: ActivatedRoute) {

    // this.employee = new Employee();
    // this.employee.id = '1';
    // this.employee.name = 'suhaib';
    // this.employee.role = 'co-owner';
    // this.employee.type = 'full time';
    // this.employees.push(this.employee);
    // this.employee = new Employee();
    // this.employee.id = '2';
    // this.employee.name = 'karan';
    // this.employee.role = 'co-owner';
    // this.employee.type = 'part time';
    // this.employees.push(this.employee);
    // console.log(this.employees)

    this.searchOptions = [
      {name: 'Name',value:'name'},
      {name: 'Role',value:'role'},
      {name: 'Type',value:'type'}
    ];

    this.showEmployees();

  }

  ngOnInit(): void {

    // this.employees$ = this.http
    // .get<Employee[]>("http://localhost:5000/employee")
    // .pipe(map(data => _.values(data)));
    // console.log(JSON.stringify(this.employees$))
  
    this.loading = false;
    
    
    this.addSubs = this.employeeService.employeeFormClosedSubject.subscribe( () => {
      this.router.navigate(['employees']);
    });

    this.attendanceSubs = this.employeeService.employeeAttendanceClosedSubject.subscribe( () => {
        this.router.navigate(['employees']);
    });
     
    this.viewSubs = this.employeeService.employeeViewClosedSubject.subscribe( () => {
      this.router.navigate(['employees']);
    });

  }

  showEmployees() {
    this.employee = new Employee();
    this.employeeService.getEmployees().subscribe(data   =>  {
      this.len = data['data'].length
      for(let i = 0;i < this.len;i++) {
      this.employees.push(this.employee = {
          id: data["data"][i].id,
          name:  data["data"][i].name,
          role: data["data"][i].role,
          type: data["data"][i].type,
          phone: data["data"][i].phone,
          email: data["data"][i].email,       
      })}});  
  }
  

  searchOptionChangeEvent() {
    this.table.reset();
  }

  search(event) {
    this.table.filter(event.target.value, this.selectedSearchOption.value, 'contains');  
  }

  ngOnDestroy(): void {
    this.addSubs.unsubscribe();
    this.attendanceSubs.unsubscribe();
    this.viewSubs.unsubscribe();
    this.editSubs.unsubscribe();
  }

  onAdd() {
    this.router.navigate(['add'], { relativeTo: this.activatedRoute });
  }

  viewAttendance(id) {

    this.router.navigate(['attendance'], {
      queryParams: { employeeId: id },
      relativeTo: this.activatedRoute,
    });

  }

  viewEmployee(id) {
    
    this.router.navigate(['view'], {
      queryParams: { employeeId: id },
      relativeTo: this.activatedRoute,
    });

  }

  getEmployeeList() {

  }

}

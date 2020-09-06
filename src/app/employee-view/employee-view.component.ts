import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../_services/employee.service';
import { Employee } from '../_models/employee';

@Component({
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.css']
})
export class EmployeeViewComponent implements OnInit,OnDestroy {

  viewEmployeeDialog: boolean = false;
  employee;
  header;

  constructor(private activatedRoute: ActivatedRoute, private employeeService: EmployeeService, private router: Router) {

  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( (params) => {

      this.activatedRoute.queryParams.subscribe( (queryParam) => {
        
        this.employee = new Employee(); 
        this.employee.id = queryParam.employeeId;
        this.employee.name = "suhaib";
        this.employee.gender = "M";
        this.employee.dob = new Date("11/11/1991");  
        this.employee.phone = 6692167706;
        this.employee.email = "suhaib@tariqaziz.com";
        this.employee.address = "200 vada chennai";
        this.employee.city =  "Erode";
        this.employee.state = "Karnataka";
        this.employee.zip = "00234";
        this.employee.type = "Full time";
        this.employee.wages =  "10000000000";
        this.employee.esi =  "Y";
        this.employee.amount = "1200";
        this.employee.role = "CEO";

      });

      this.header = this.employee.name + '\'s Info';
      this.viewEmployeeDialog = true;

    });

  }

  ngOnDestroy(): void {
 
    this.viewEmployeeDialog = false;
    this.employeeService.employeeViewClosedEvent();
 
  }

  onEdit() {
    
    this.viewEmployeeDialog = false;
    console.log('View:'+this.employee.id);
    this.employeeService.employeeEditClickedEvent(this.employee.id);
    // this.ngOnDestroy();

  }

}
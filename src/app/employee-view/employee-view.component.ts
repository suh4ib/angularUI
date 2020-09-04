import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InputService } from '../services/input.service';
import { Employee } from '../_models/employee';

@Component({
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.css']
})
export class EmployeeViewComponent implements OnInit,OnDestroy {

  viewEmployeeDialog: boolean=false;
  emp;
  

  constructor(private activatedRoute: ActivatedRoute,private service: InputService) {

   }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
        this.activatedRoute.queryParams.subscribe((queryParam) => {
        this.emp = new Employee(); 
        this.emp.id = queryParam.employeeId;
        this.emp.name = "suhaib";
        this.emp.gender = "M";
        this.emp.dob = new Date("11/11/1991");  
        this.emp.phone = 6692167706;
        this.emp.email = "suhaib@tariqaziz.com";
        this.emp.address = "200 vada chennai";
        this.emp.city =  "Erode";
        this.emp.state = "Karnataka";
        this.emp.zip = "00234";
        this.emp.type = "Full time";
        this.emp.wages =  "10000000000";
        this.emp.esi =  "Y";
        this.emp.amount = "1200";
        this.emp.role = "CEO";
        });
        this.viewEmployeeDialog = true;
    });
  }

  private closeEmployeeFormComponent() {
    this.viewEmployeeDialog = false;
    this.service.employeeFormDialogClosedEvent();
  }
  ngOnDestroy(): void {
    this.closeEmployeeFormComponent();
  }

  close() {
    this.closeEmployeeFormComponent();
  }


  
}

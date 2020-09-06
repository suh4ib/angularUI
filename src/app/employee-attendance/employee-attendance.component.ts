import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../_services/employee.service';

@Component({
  selector: 'app-employee-attendance',
  templateUrl: './employee-attendance.component.html',
  styleUrls: ['./employee-attendance.component.css'],
})
export class EmployeeAttendanceComponent implements OnInit, OnDestroy {

  showAttendance: boolean = false;
  id;

  constructor(private activatedRoute: ActivatedRoute, private employeeService: EmployeeService) {

  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe((params) => {
      this.activatedRoute.queryParams.subscribe((queryParam) => {
        this.id = queryParam.employeeId;
        // console.log(this.id);
      });
      this.showAttendance = true;
    });
    
  }

  ngOnDestroy(): void {
    this.showAttendance = false;
    this.employeeService.employeeAttendanceClosedEvent();
  }

}

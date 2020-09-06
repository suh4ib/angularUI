import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  
  employeeFormClosedSubject = new Subject<void>();
  employeeAttendanceClosedSubject = new Subject<void>();
  employeeViewClosedSubject = new Subject<void>();

  employeeFormClosedEvent() {
    this.employeeFormClosedSubject.next();
  }

  employeeAttendanceClosedEvent() {
    this.employeeAttendanceClosedSubject.next();
  }

  employeeViewClosedEvent(){
    this.employeeViewClosedSubject.next();
  }

}

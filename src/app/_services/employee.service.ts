import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  
  employeeFormClosedSubject = new Subject<void>();
  employeeAttendanceClosedSubject = new Subject<void>();
  employeeViewClosedSubject = new Subject<void>();

  employeeEditId;

  employeeFormClosedEvent() {
    this.employeeFormClosedSubject.next();
  }

  employeeAttendanceClosedEvent() {
    this.employeeAttendanceClosedSubject.next();
  }

  employeeViewClosedEvent(){
    this.employeeViewClosedSubject.next();
  }

  employeeEditClickedEvent(id) {
    this.employeeEditId = id;
  }

  getEmployeeEditId() {
    return this.employeeEditId;
  }

}
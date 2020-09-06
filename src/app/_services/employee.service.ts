import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  
  employeeFormClosedSubject = new Subject<void>();
  employeeAttendanceClosedSubject = new Subject<void>();
  employeeViewClosedSubject = new Subject<void>();
  employeeEditClickedSubject = new Subject<any>();

  employeeFormClosedEvent() {
    this.employeeFormClosedSubject.next();
  }

  employeeAttendanceClosedEvent() {
    this.employeeAttendanceClosedSubject.next();
  }

  employeeViewClosedEvent(){
    this.employeeViewClosedSubject.next();
  }

  employeeEditClickedEvent(id: any) {
    console.log('Service:'+id);
    this.employeeEditClickedSubject.next(id);
  }

}

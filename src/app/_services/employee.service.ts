import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs/Observable';
import { catchError, retry } from 'rxjs/operators';
import { Employee } from '../_models/employee';


@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  
  constructor(private http: HttpClient) { }
  
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

  getEmployees() {
    let getAllEmployeesURL = "http://localhost:5000/employee"
    return this.http.get(getAllEmployeesURL);
  }

}
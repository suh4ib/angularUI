import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  
  constructor(private http: HttpClient) { }

  headers = { 'content-type': 'application/json'};

  getEmployees() {
    let url = "http://localhost:8080/employees";
    return this.http.get(url);
  }

  inactivateEmployee(id) {
    let url = "http://localhost:8080/employee/"+id;
    return this.http.delete(url);
  }

  insertEmployee(employee) : Observable<any> {
    
    let url = "http://localhost:8080/employee";
    return this.http.post<any>(url, JSON.stringify(employee), {'headers':this.headers} );
  }

  updateEmployee(employee) : Observable<any> {
    let url = "http://localhost:8080/employee";
    return this.http.put<any>(url, JSON.stringify(employee), {'headers':this.headers} );
  }

}
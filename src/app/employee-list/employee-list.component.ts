import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmployeeService } from '../_services/employee.service';
import { Employee } from '../_models/employee';
import * as _ from 'lodash';
import { Department } from '../_models/department';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit, OnDestroy {

  searchText = '';
  selectedEmployee: Employee;
  availableTypes = ['FullTime', 'PartTime', 'Internship', 'All'];
  availableRoles = ['Lead', 'Developer', 'Operations', 'DevOps','All'];
  availableDesignations = ['Officer', 'VicePresident', 'Director'];
  selectedType = 'All';
  selectedRole = 'All';
  dispMap = new Map<string, Map<string, Array<Employee>>>();
  map = new Map<string, Map<string, Array<Employee>>>();
  editMode = false;
  addMode = true;

  constructor( private employeeService: EmployeeService ) { }

  async ngOnInit(): Promise<void> {
    this.initEmployee();
    this.initModes();
    this.showEmployees();
  }

  initEmployee(){
    this.selectedEmployee = new Employee();
    this.selectedEmployee.type = '';
    this.selectedEmployee.gender = '';
    this.selectedEmployee.role = '';
    this.selectedEmployee.designation = '';
    this.selectedEmployee.department = new Department();
    this.selectedEmployee.department.code = '';
  }

  initModes(){
    this.addMode = true;
    this.editMode = false;
  }

  async showEmployees(): Promise<any> {
    const employees = [];
    const local = false;

    if (local) {
      const dept = {
        code: 'GCT'
      };
      for (let i = 0; i < 5; i++) {
        const emp = {
          id: i + '',
          name: i + 'name',
          type: i % 2 === 0 ? 'PartTime' : 'FullTime',
          gender: i % 2 === 0 ? 'Male' : 'Female',
          phone: i,
          email: i + '@mail.com',
          image:
            'https://daman.co.id/daman.co.id/wp-content/uploads/2019/10/Robert-Downey-Jr-Glasses-1-1024x1024.jpg',
          aadhar: i,
          department : dept,
          role : 'Developer',
          designation: 'Officer',
          address: 'street',
          salary: 1000
        };
        employees.push(emp);
      }

      const temp = new Map<string, Array<Employee>>();
      temp.set('PartTime', employees.filter(emp => emp.type.includes('PartTime')));
      temp.set('FullTime', employees.filter(emp => emp.type.includes('FullTime')));

      this.map.set('Developer', temp);
      this.map.set('DevOps', temp);
      this.dispMap = new Map<string, Map<string, Array<Employee>>>(this.map);
    } else {
      this.employeeService.getEmployees().pipe(
        map( (data:any) => {

          console.log(data);
          
          let temp = new Map<string, Map<string, Array<Employee>>>();

          Object.keys(data).forEach( role => {
            var typeMap = data[role];
            Object.keys(typeMap).forEach( type =>{
              var list:Array<any> = data[role][type];
                for(let ele of list){
                  let emp = new Employee();
                  emp.id = ele.employeeId;
                  emp.name= ele.employeeName,
                  emp.type= ele.employeeType,
                  emp.gender= ele.employeeGender,
                  emp.phone= ele.employeePhone,
                  emp.email= ele.employeeEmail,
                  emp.image=
            'https://daman.co.id/daman.co.id/wp-content/uploads/2019/10/Robert-Downey-Jr-Glasses-1-1024x1024.jpg',
            emp.department= new Department(),
            emp.department.code = ele.department.code,
            emp.role= ele.employeeRole,
            emp.designation= ele.employeeDesingation,
            emp.address= ele.employeeAddress,
            emp.salary= ele.employeeSalary;

            
            if(temp.get(role)!=null){
              if(temp.get(role).get(type)!=null){
                temp.get(role).get(type).push(emp);
              } else{
                const typeValue = new Array<Employee>();
                typeValue.push(emp);
                temp.get(role).set(type,typeValue);
              }
            } else{
              const typeValueMap = new Map<string, Array<Employee>>();
              const typeValue = new Array<Employee>();
              typeValue.push(emp);
              typeValueMap.set(type, typeValue);
              temp.set(role,typeValueMap);
            }
                }
            })
        } )
          return temp;
        } )
      ).subscribe( (data) => {
        this.map = data;
        this.dispMap = this.map;
      }, (error) => {
        console.log(error);
      });
    }
  }

  ngOnDestroy(): void {
  }

  onNewEmployee(): void {
    this.initEmployee();
    this.initModes();
  }

  selected(employee): void {
    this.addMode = false;
    this.editMode = false;
    this.selectedEmployee = { ...employee };
  }

  changeToEditMode(): void {
    this.addMode = false;
    this.editMode = true;
  }

  insertEmployee(){
    console.log(JSON.stringify(this.selectedEmployee));
    this.employeeService.insertEmployee(this.selectedEmployee).subscribe( data => {
      console.log(data);
      this.ngOnInit();
    });
  }

  updateEmployee(){
    console.log(JSON.stringify(this.selectedEmployee));
    this.employeeService.updateEmployee(this.selectedEmployee).subscribe( data => {
      console.log(data);
      this.ngOnInit();
    });
  }

  async removeEmployee(): Promise<void> {
    console.log(this.selectedEmployee);
    this.employeeService.inactivateEmployee(this.selectedEmployee.id).subscribe( data => {
      console.log(data);
      this.ngOnInit();
    });
  }

  alterTypeFilterItem(type): void {
    this.selectedType = type;
    this.alter();
  }

  alterRoleFilterItem(role): void {
    this.selectedRole = role;
    this.alter();
  }

  alter(): void {

    this.initEmployee();
    this.initModes();

    if (this.selectedRole === 'All') {
      this.dispMap = new Map<string, Map<string, Array<Employee>>>(this.map);
    } else {
      this.dispMap = new Map<string, Map<string, Array<Employee>>>();
      this.dispMap.set(this.selectedRole, this.map.get(this.selectedRole));
    }

    if (this.selectedType !== 'All') {
      const temp = new Map<string, Map<string, Array<Employee>>>();
      for (let dispKey of this.dispMap.keys()) {
        const topMap = this.dispMap.get(dispKey);
        const values = topMap.get(this.selectedType);
        const val = new Map<string, Array<Employee>>();
        val.set(this.selectedType, values);
        temp.set(dispKey, val);
      }
      this.dispMap = temp;
    }

    if (this.searchText !== '') {
      const temp = new Map<string, Map<string, Array<Employee>>>();
      this.dispMap.forEach( (typeMap,role) => {
        typeMap.forEach( (list,typeKey) => {
          for (let ele of list) {
            if(ele.name.includes(this.searchText)){
              if(temp.get(role)!=null){
                if(temp.get(role).get(typeKey)!=null){
                  temp.get(role).get(typeKey).push(ele);
                } else{
                  const typeValue = new Array<Employee>();
                  typeValue.push(ele);
                  temp.get(role).set(typeKey,typeValue);
                }
              } else{
                const typeValueMap = new Map<string, Array<Employee>>();
                const typeValue = new Array<Employee>();
                typeValue.push(ele);
                typeValueMap.set(typeKey, typeValue);
                temp.set(role,typeValueMap);
              }
            }
          }
        } )
      } );
      this.dispMap = temp;
    }
  }
}

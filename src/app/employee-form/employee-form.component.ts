import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EmployeeService } from '../_services/employee.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
})
export class EmployeeFormComponent implements OnInit, OnDestroy {

  addEmployeeDialog: boolean;
  editEmployeeDialog: boolean;

  employeeForm: FormGroup;
  
  yearRange: string;
  currentYear: number;
  employmentType: string = 'default';
  genders: SelectItem[];
  employmentTypes: SelectItem[];
  pfOptions: SelectItem[];

  constructor(private employeeService: EmployeeService, private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router ) {

    this.currentYear = new Date().getFullYear();
    this.yearRange = (this.currentYear - 80).toString() + ':' + this.currentYear.toString();

    this.genders = [
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' },
      { label: 'Other', value: 'other' },
    ];

    this.employmentTypes = [
      { label: 'Full Time', value: 'fullTime' },
      { label: 'Contractor', value: 'contractor' },
    ];

    this.pfOptions = [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' },
    ];

    this.employeeForm = this.formBuilder.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      phone: ['', Validators.required],
      email: [''],
      salary: [''],
      type: [''],
      pfOption: [''],
      pf: [''],
      street: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe((params) => {
      
      if (params.mode === 'add') {
        this.addEmployeeDialog = true;
      }

      if (params.mode === 'edit') {

        this.router.navigate( [], {
          relativeTo: this.activatedRoute,
          queryParams: { employeeId: this.employeeService.getEmployeeEditId() },
          queryParamsHandling: 'merge'
        });

        this.employeeForm.patchValue({ name: 'suhaib' });
        this.editEmployeeDialog = true;
      }

    });
  
  }

  ngOnDestroy(): void {
    this.closeEmployeeFormComponent();
  }

  onSubmit() {
    this.closeEmployeeFormComponent();
  }

  private closeEmployeeFormComponent() {
    this.addEmployeeDialog = false;
    this.editEmployeeDialog = false;
    this.employeeService.employeeFormClosedEvent();
  }

}

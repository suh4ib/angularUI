import {
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { InputService } from '../services/input.service';
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
  viewEmployeeDialog: boolean;
  employeeForm: FormGroup;
  yearRange: string;
  currentYear: number;
  employmentType: string = 'default';
  givenEmployeeId;

  genders: SelectItem[];
  employmentTypes: SelectItem[];
  pfOptions: SelectItem[];
  // pfSelector: boolean = false;

  constructor(
    private service: InputService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {
    this.currentYear = new Date().getFullYear();
    this.yearRange =
      (this.currentYear - 80).toString() + ':' + this.currentYear.toString();

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

    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      phone: ['', Validators.required],
      email: [''],
      salary: [''],
      type: [''],
      pfOption: [''],
      pf: [''],
      // pfSelector:[false,Validators.required],
      street: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      // console.log(params.mode);

      if (params.mode === 'add') {
        this.addEmployeeDialog = true;
      }

      if (params.mode === 'edit') {
        this.activatedRoute.queryParams.subscribe((queryParam) => {
          // console.log(queryParam.employeeId);
          this.givenEmployeeId = queryParam.employeeId;
        });
        this.employeeForm.patchValue({ name: 'suhaib' });
        this.editEmployeeDialog = true;
      }

      if (params.mode === 'view') {
        this.activatedRoute.queryParams.subscribe((queryParam) => {
          // console.log(queryParam.employeeId);
          this.givenEmployeeId = queryParam.employeeId;

          // let emplydata ;
        });

        this.employeeForm.patchValue({
          name: 'suhaib',
          type: 'fullTime',
          pfOption: 'yes',
          pf: 1000,
        });
        this.employeeForm.disable();
        this.viewEmployeeDialog = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.closeEmployeeFormComponent();
  }

  close() {
    this.closeEmployeeFormComponent();
  }

  closePopup() {
    this.closeEmployeeFormComponent();
  }

  onSubmit() {
    this.closeEmployeeFormComponent();
  }

  private closeEmployeeFormComponent() {
    this.addEmployeeDialog = false;
    this.editEmployeeDialog = false;
    this.viewEmployeeDialog = false;
    this.service.employeeFormDialogClosedEvent();
  }
}



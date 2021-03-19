import { Department } from '../_models/department';

export class Employee {
    id;
    name;
    type;
    role;
    designation;
    salary;
    // statusType;
    // statusReason;
    // doj;
    // dob;
    // dol;
    department: Department;
    image;
    gender;
    phone;
    email;
    // aadhar;
    address;
}

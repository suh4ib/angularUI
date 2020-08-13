export class Employee {
    id: string;
    name: string;
    role: string;
    type:string;
    gender: string;
    dob:Date;
    doj:Date;
    address:string;
    email:string;
    phone = new Array<number>(2);
    image:File;
}
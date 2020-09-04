import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeAttendanceComponent } from './employee-attendance/employee-attendance.component';
import { EmployeeViewComponent } from './employee-view/employee-view.component';

const routes: Routes = [
  {
    path: 'employees',
    component: EmployeeListComponent,
    children: [
      { path: 'attendance', component: EmployeeAttendanceComponent },
      { path: 'view', component: EmployeeViewComponent},
      { path: ':mode', component: EmployeeFormComponent },
    ],
  },

  // otherwise redirect to home
  { path: '**', redirectTo: 'employees' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
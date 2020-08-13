import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeHomeComponent } from './employee-home/employee-home.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeAttendanceComponent } from './employee-attendance/employee-attendance.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeHomeComponent,
    EmployeeFormComponent,
    EmployeeListComponent,
    EmployeeAttendanceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

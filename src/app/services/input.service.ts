import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InputService {
  employeeFormDialogClosed = new Subject<void>();
  employeeAttendanceSideBarClosed = new Subject<void>();

  public employeeFormDialogClosedEvent() {
    this.employeeFormDialogClosed.next();
  }

  public employeeAttendanceSideBarClosedEvent() {
    this.employeeAttendanceSideBarClosed.next();
  }
}

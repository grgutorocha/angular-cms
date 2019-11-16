import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private subject = new Subject<any>();

  constructor(private snackBar: MatSnackBar) {
  }

  observe(): Observable<any> {
    return this.subject.asObservable();
  }

  setSubject(type, message) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  success(message: string) {
    this.setSubject('success', message);
  }

  error(message: string) {
    this.setSubject('error', message);
  }

  clear() {
    this.subject.next();
  }

}

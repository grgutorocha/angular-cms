import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private subject = new Subject<any>();

  observe(): Observable<any> {
    return this.subject.asObservable();
  }

  setSubject(type, message) {
    this.subject.next({ type, message });
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

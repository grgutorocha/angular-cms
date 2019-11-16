import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private subject = new Subject<boolean>();

  observe(): Observable<boolean> {
    return this.subject.asObservable();
  }

  show() {
    this.subject.next(true);
  }

  hide() {
    this.subject.next(false);
  }
}

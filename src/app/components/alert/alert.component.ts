import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';

import {AlertService} from '../../services';

@Component({
  selector: 'app-alert',
  templateUrl: 'alert.component.html'
})
export class AlertComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  alert: any;

  constructor(private alertService: AlertService) {
  }

  ngOnInit() {
    this.bindEvents();
    this.setSubscription();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  render(alert) {
    this.alert = alert;
  }

  setSubscription() {
    this.subscription = this.alertService.observe().subscribe(this.render);
  }

  bindEvents() {
    this.render = this.render.bind(this);
  }
}

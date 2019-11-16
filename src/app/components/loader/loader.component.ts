import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

import {LoaderService} from '../../services';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  show: boolean;

  constructor(private loaderService: LoaderService) {
  }

  ngOnInit() {
    this.bindEvents();
    this.setSubscription();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  render(isLoading) {
    this.show = isLoading;
  }

  setSubscription() {
    this.subscription = this.loaderService.observe().subscribe(this.render);
  }

  bindEvents() {
    this.render = this.render.bind(this);
  }

}

import {Component, OnInit} from '@angular/core';

import { AuthGuardService } from '../../services';

@Component({
  selector: 'app-greeting',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.scss']
})
export class GreetingComponent implements OnInit {

  welcome: string;

  constructor(private authGuardService: AuthGuardService) {}

  ngOnInit() {
    const { name } = JSON.parse(this.authGuardService.getCurrentUser());
    this.welcome = (name) ? `Hello, ${name}` : '';
  }

}

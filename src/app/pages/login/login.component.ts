import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertService, AuthenticationService, AuthGuardService } from '../../services';

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  controlsConfig = {
    email: ['', Validators.required],
    password: ['', Validators.required]
  };

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: AuthenticationService,
    private alertService: AlertService,
    private authGuardService: AuthGuardService
  ) {
    if (this.authGuardService.isLogged()) {
      this.goToDashboard();
    }

    this.binds();
  }

  ngOnInit() {
    this.configForm();
  }

  get formControl() { return this.form.controls; }

  configForm() {
    this.form = this.formBuilder.group(this.controlsConfig);
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.login();
  }

  login() {
    this.service.login(this.form.value).subscribe(this.onSuccess, this.onError);
  }

  onSuccess(data) {
    this.authGuardService.setCurrentUser(JSON.stringify(data.result));
    this.goToDashboard();
  }

  onError(error) {
    this.authGuardService.removeCurrentUser();
    this.alertService.error(error.error.message);
  }

  goToDashboard() {
    this.router.navigate(['/']);
  }

  binds() {
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
  }
}

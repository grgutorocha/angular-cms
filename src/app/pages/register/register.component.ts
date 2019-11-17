import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router} from '@angular/router';

import {AlertService, UserService} from '../../services';

@Component({
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  controlsConfig = {
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', [Validators.required]]
  };

  constructor(
    private service: UserService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private router: Router
  ) {
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

    this.create();
  }

  create() {
    this.service.post(this.form.value).subscribe(this.onSuccess, this.onError);
  }

  onSuccess() {
    this.alertService.success('Successfully saved');
    this.router.navigate(['/login']);
  }

  onError(error) {
    this.alertService.error(error.error.message);
  }

  binds() {
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
  }
}

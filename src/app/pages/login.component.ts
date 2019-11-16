import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertService, AuthenticationService, AuthGuardService, StorageService, StorageType } from '../services';

@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private authGuardService: AuthGuardService,
    private storageService: StorageService,
  ) {
    if (this.authGuardService.isLogged()) {
      this.router.navigate(['/']).then(() => console.log('Redirected'));
    }

    this.storageService.setType(StorageType.LOCAL);
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get formControl() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    this.alertService.clear();

    if (this.loginForm.invalid) {
      return;
    }

    this.authenticationService.login(this.formControl.email.value, this.formControl.password.value)
      .subscribe(
        data => {
          // @ts-ignore
          this.storageService.set('currentUser', JSON.stringify(data.result));
          this.router.navigate(['/']).then(() => console.log('Redirected'));
        },
        error => {
          this.storageService.remove('currentUser');
          this.alertService.error(error.error.message);
        });
  }
}

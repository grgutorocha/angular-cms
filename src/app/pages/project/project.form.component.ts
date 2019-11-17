import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertService, ProjectService } from '../../services';

@Component({
  selector: 'app-project-form',
  templateUrl: './project.form.component.html'
})
export class ProjectFormComponent implements OnInit {

  id: string;
  form: FormGroup;
  submitted = false;
  controlsConfig = {
    name: ['', Validators.required]
  };

  constructor(
    private service: ProjectService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.binds();
    this.setParams();
  }

  setParams() {
    this.route.params.subscribe(params => this.id = params.id);
  }

  ngOnInit() {
    this.configForm();

    if (this.id) {
      this.get();
    }
  }

  get formControl() { return this.form.controls; }

  configForm() {
    this.form = this.formBuilder.group(this.controlsConfig);
  }

  get() {
    this.service.get(this.id).subscribe(this.loadForm);
  }

  loadForm(data) {
    this.form.controls.name.setValue(data.result.name);
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.save();
  }

  save() {
    if (this.id) {
      this.update();
    } else {
      this.create();
    }
  }

  update() {
    this.service.put(this.id, this.form.value).subscribe(this.onSuccess, this.onError);
  }

  create() {
    this.service.post(this.form.value).subscribe(this.onSuccess, this.onError);
  }

  onSuccess() {
    this.alertService.success('Successfully saved');
    this.goToList();
  }

  onError(error) {
    this.alertService.error(error.error.message);
  }

  goToList() {
    this.router.navigate(['/project']);
  }

  binds() {
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
    this.loadForm = this.loadForm.bind(this);
  }

}

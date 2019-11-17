import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertService, TaskService } from '../../services';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html'
})
export class TaskComponent implements OnInit {

  @Input() projectId;

  id: string;
  tasks = [];

  form: FormGroup;
  submitted = false;
  controlsConfig = {
    description: ['', Validators.required]
  };

  constructor(
    private service: TaskService,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) {
    this.binds();
    this.getAll();
    this.configForm();
  }

  ngOnInit() {}

  get formControl() { return this.form.controls; }

  configForm() {
    this.form = this.formBuilder.group(this.controlsConfig);
  }

  getAll() {
    this.service.getAll().subscribe(this.onSuccessGetAll);
  }

  onSuccessGetAll(data) {
    this.tasks = data.result;
  }

  edit(id) {
    this.get(id);
    this.setId(id);
  }

  get(id) {
    this.service.get(id).subscribe(this.onSuccessGet);
  }

  onSuccessGet(data) {
    const { description } = data.result;
    this.form.controls.description.setValue(description);
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
    this.service.post({ project: this.projectId, ...this.form.value }).subscribe(this.onSuccess, this.onError);
  }

  onSuccess() {
    this.alertService.success('Successfully saved');
    this.getAll();
    this.cancel();
  }

  onError(error) {
    this.alertService.error(error.error.message);
  }

  delete(id) {
    this.service.delete(id).subscribe(() => {
      this.alertService.success('Successfully removed');
      this.tasks = this.tasks.filter(item => item._id.toString() !== id);
    });
  }

  cancel() {
    this.submitted = false;
    this.form.reset();
    this.setId(undefined);
  }

  setId(id) {
    this.id = id;
  }

  binds() {
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
    this.onSuccessGetAll = this.onSuccessGetAll.bind(this);
    this.onSuccessGet = this.onSuccessGet.bind(this);
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertService, TaskService } from '../../services';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['task.component.scss']
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
    this.tasks = data.result.filter(item => item.project.toString() === this.projectId);
  }

  edit(id) {
    const selectedTask = this.tasks.filter(item => item._id === id);
    const { description } = selectedTask[0];
    this.form.controls.description.setValue(description);
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
    this.service.put(this.id, this.form.value).subscribe(this.onSuccessUpdate, this.onError);
  }

  onSuccessUpdate(data) {
    this.tasks = this.tasks.map(item => (item._id.toString() === data.result._id.toString()) ? data.result : item);
    this.alertService.success('Successfully updated');
    this.cancel();
  }

  create() {
    this.service.post({ project: this.projectId, ...this.form.value }).subscribe(this.onSuccessCreate, this.onError);
  }

  onSuccessCreate(data) {
    this.tasks.push(data.result);
    this.alertService.success('Successfully created');
    this.cancel();
  }

  delete(id) {
    this.service.delete(id).subscribe(this.onSuccessDelete(id), this.onError);
  }

  onSuccessDelete(id) {
    return () => {
      this.alertService.success('Successfully removed');
      this.tasks = this.tasks.filter(item => item._id.toString() !== id);
    };
  }

  onError(error) {
    this.alertService.error(error.error.message);
  }

  done(id) {
    this.service.put(id, { status: 'closed' }).subscribe(this.onSuccessUpdate, this.onError);
  }

  undone(id) {
    this.service.put(id, { status: 'open' }).subscribe(this.onSuccessUpdate, this.onError);
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
    this.onSuccessUpdate = this.onSuccessUpdate.bind(this);
    this.onSuccessCreate = this.onSuccessCreate.bind(this);
    this.onSuccessDelete = this.onSuccessDelete.bind(this);
    this.onError = this.onError.bind(this);
    this.onSuccessGetAll = this.onSuccessGetAll.bind(this);
    this.onSuccessGet = this.onSuccessGet.bind(this);
  }

}

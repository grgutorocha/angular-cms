import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertService, ProjectService } from '../../services';

@Component({
  selector: 'app-project-form',
  templateUrl: './project.form.component.html'
})
export class ProjectFormComponent implements OnInit {

  projectForm: FormGroup;
  submitted = false;

  id: string;

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.setParams();
  }

  setParams() {
    this.route.params.subscribe(params => {
      this.id = params.id;
    });
  }

  ngOnInit() {
    this.projectForm = this.formBuilder.group({
      name: ['', Validators.required]
    });

    if (this.id) {
      this.load();
    }
  }

  get formControl() { return this.projectForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.projectForm.invalid) {
      return;
    }

    this.save();
  }

  save() {
    if (this.id) {
      this.projectService.put(this.id, this.projectForm.value).subscribe(
        () => {
          this.alertService.success('Updated successfully');
          this.goToList();
        },
        error => this.alertService.error(error.error.message)
      );
    } else {
      this.projectService.post(this.projectForm.value).subscribe(
        () => {
          this.alertService.success('Created successfully');
          this.goToList();
        },
        error => this.alertService.error(error.error.message)
      );
    }
  }

  load() {
    this.projectService.get(this.id).subscribe(data => {
      // @ts-ignore
      this.projectForm.controls.name.setValue(data.result.name);
    });
  }

  goToList() {
    this.router.navigate(['/project']).then(null);
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, ProjectService } from '../../services';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html'
})
export class ProjectComponent implements OnInit {

  projects = [];

  constructor(
    private projectService: ProjectService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    // @ts-ignore
    this.projectService.getAll().subscribe(data => this.projects = data.result);
  }

  delete(id) {
    this.projectService.delete(id).subscribe(() => {
      this.alertService.success('Successfully removed');
      this.projects = this.projects.filter(item => item._id.toString() !== id);
    });
  }

  create() {
    this.router.navigate(['/project/form']).then(null);
  }

  edit(id) {
    this.router.navigate(['/project/form', id]).then(null);
  }

}

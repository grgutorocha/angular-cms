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
    private service: ProjectService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    // @ts-ignore
    this.service.getAll().subscribe(data => this.projects = data.result);
  }

  delete(id) {
    this.service.delete(id).subscribe(() => {
      this.alertService.success('Successfully removed');
      this.projects = this.projects.filter(item => item._id.toString() !== id);
    });
  }

  create() {
    this.router.navigate(['/project/form']);
  }

  edit(id) {
    this.router.navigate(['/project/form', id]);
  }

}

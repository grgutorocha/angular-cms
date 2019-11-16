import { Component, OnInit } from '@angular/core';

import { UserService } from '../services';

@Component({
  templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {
  users: any = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadAllUsers();
  }

  deleteUser(id: number) {
    this.userService.delete(id).subscribe(() => this.loadAllUsers());
  }

  private loadAllUsers() {
    // @ts-ignore
    this.userService.getAll().subscribe(users => this.users = users.result);
  }
}

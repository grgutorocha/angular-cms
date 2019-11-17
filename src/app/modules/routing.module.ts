import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../services';

import {
  HomeComponent,
  LoginComponent,
  RegisterComponent,
  MasterComponent,
  ProjectComponent,
  ProjectFormComponent
} from '../pages';

const routes: Routes = [
  {
    path: '',
    component: MasterComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: '', redirectTo: 'project', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'project', component: ProjectComponent },
      { path: 'project/form', component: ProjectFormComponent },
      { path: 'project/form/:id', component: ProjectFormComponent },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

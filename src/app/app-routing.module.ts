import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginformComponent } from '../app/loginform/loginform.component';
import { EmployeeListComponent } from './employeelist/employeelist.component';
import { UpdateComponent } from './update/update.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginformComponent },
  { path: 'table', component: EmployeeListComponent },
  { path: 'update/:id', component: UpdateComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

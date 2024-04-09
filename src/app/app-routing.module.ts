import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginformComponent } from '../app/loginform/loginform.component';
import { EmployeeListComponent } from './employeelist/employeelist.component';
import { UpdateComponent } from './update/update.component';


const routes: Routes = [
  { path: 'login', component: LoginformComponent },
  { path: 'login/employees', component: EmployeeListComponent },
  { path: 'login/employees/update/:id', component: UpdateComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

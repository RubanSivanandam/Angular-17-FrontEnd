import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginformComponent } from './loginform/loginform.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeListComponent } from './employeelist/employeelist.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  { path: 'login', component: LoginformComponent },
  { path: 'login/employees', component: EmployeeListComponent },
  { path: 'login/employees/update/:id', component: UpdateComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginformComponent,
    EmployeeListComponent,
    UpdateComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes), 
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

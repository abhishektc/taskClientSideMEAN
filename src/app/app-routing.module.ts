import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { TaskListComponent } from './task-list/task-list.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: 'login', component: LoginComponent },
  { path: 'createTask', component: CreateTaskComponent },
  { path: 'taskList', component: TaskListComponent },
  { path: 'editTask/:id', component: EditTaskComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

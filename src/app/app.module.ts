import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { TaskListComponent } from './task-list/task-list.component';
import { AssignedTaskComponent } from './assigned-task/assigned-task.component';
import { HttpClientModule } from '@angular/common/http';
import { TimerComponent } from './timer/timer.component';
import { NotesFormComponent } from './components/notes-form/notes-form.component';
import { EditTaskComponent } from './edit-task/edit-task.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    CreateTaskComponent,
    TaskListComponent,
    AssignedTaskComponent,
    TimerComponent,
    NotesFormComponent,
    EditTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

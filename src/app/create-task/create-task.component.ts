import { TokenStorageService } from './../service/token-storage.service';
import { SystemServiceService } from './../service/system-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  isLoggedIn = false;
  isTaskCreated = false;
  message = '';
  isError = false;
  errorMessage = '';
  data = [];
  id:any;
  constructor(private fb: FormBuilder, private service: SystemServiceService, private tokenStorage:TokenStorageService) { }

  createTask = this.fb.group({
    taskName: new FormControl('', [Validators.required]),
    taskDetails: new FormControl('', [Validators.required]),
    deadLine: new FormControl('', [Validators.required]),
    employee: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorage.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorage.getUser();
      this.id = user.id;
    }
    this.service.getEmployee().subscribe(
      data => {
        this.data = data.data;
      }
    )
  }

  task(data) {
    const taskName = data.value.taskName;
    const taskDetails = data.value.taskDetails;
    const deadLine = data.value.deadLine;
    const employeeId = data.value.employee;    
    const managerId = this.id;
    this.isTaskCreated = false;
    this.isError = false;

    this.service.createTask({ taskName, taskDetails, deadLine, employeeId, managerId }).subscribe(
      data => {
        this.message = data.message;
        this.isTaskCreated = true;
        this.isError = false;
        this.createTask.reset();
      },
      err => {
        this.isTaskCreated = false;
        this.isError = true;
        this.errorMessage = 'Something went wrong, Please try again.'
      }
    );
  }
}

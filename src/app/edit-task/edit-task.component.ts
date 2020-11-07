import { SystemServiceService } from './../service/system-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  isTaskUpdated = false;
  message = '';
  isError = false;
  errorMessage = '';
  data;
  id: any;
  taskId: any;

  constructor(private fb: FormBuilder, private service: SystemServiceService, private _route: ActivatedRoute, private router: Router) { }

  updateTask = this.fb.group({
    taskName: new FormControl('', [Validators.required]),
    taskDetails: new FormControl('', [Validators.required]),
    deadLine: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.taskId = this._route.snapshot.paramMap.get('id');
    this.service.getTaskByTaskId(this.taskId).subscribe(
      data => {
        this.data = data.data,
          this.updateTask.patchValue({
            taskName: data.data.taskName,
            taskDetails: data.data.taskDetails,
            deadLine: data.data.deadLine
          })
      }
    );

  }

  task(data) {
    const taskName = data.value.taskName;
    const taskDetails = data.value.taskDetails;
    const deadLine = data.value.deadLine;
    this.isTaskUpdated = false;
    this.isError = false;

    this.service.updateTaskByTaskId({ _id: this.taskId, taskName, taskDetails, deadLine }).subscribe(
      data => {
        this.message = data.message;
        this.isTaskUpdated = true;
        this.isError = false;
        this.updateTask.reset();
        alert(this.message)
        this.router.navigate(['taskList']);
      },
      err => {
        this.isTaskUpdated = false;
        this.isError = true;
        this.errorMessage = 'Something went wrong, Please try again.'
      }
    );
  }

}

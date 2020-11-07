import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { SystemServiceService } from './../../service/system-service.service';

@Component({
  selector: 'app-notes-form',
  templateUrl: './notes-form.component.html',
  styleUrls: ['./notes-form.component.css']
})
export class NotesFormComponent implements OnInit {

  @Input()
  data:any

  taskProgressUpdate = this.fb.group({
    taskCompleted: new FormControl('', [Validators.required, Validators.compose([Validators.pattern('^[1-9][0-9]?$|^100$')])]),
    taskNote: new FormControl('', [Validators.required]),
  });

  constructor(private fb: FormBuilder, private service: SystemServiceService) { }

  ngOnInit(): void {

  }

  taskProgress(data:any, id:any, deadLine:any) {
    if (new Date(deadLine).getTime() < (new Date().getTime())) {
      alert('Given time is Over')
    } else {
      const taskNote = data.value.taskNote;
      const taskCompleted = data.value.taskCompleted;
      const taskId = id;
      this.service.updateTaskWithNotes({ taskNote, taskCompleted, taskId }).subscribe(
        data => {
          alert(data.message);  
          window.location.reload();
        }
      );
    }
  }

}

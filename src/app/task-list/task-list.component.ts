import { SystemServiceService } from './../service/system-service.service';
import { TokenStorageService } from './../service/token-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  task = [];
  isLoggedIn = false;

  constructor(private tokenStorage:TokenStorageService, private service:SystemServiceService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorage.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorage.getUser();
      const id = user.id;
      
      this.service.getTaskByManagerId(id).subscribe(
        data => {        
          this.task = data.data
        }
      );


    }
  }

}

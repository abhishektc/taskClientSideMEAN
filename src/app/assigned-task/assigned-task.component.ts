import { SystemServiceService } from './../service/system-service.service';
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../service/token-storage.service';

@Component({
  selector: 'app-assigned-task',
  templateUrl: './assigned-task.component.html',
  styleUrls: ['./assigned-task.component.css']
})
export class AssignedTaskComponent implements OnInit {
  task = [];
  isLoggedIn = false;

  constructor(private tokenStorage: TokenStorageService, private service: SystemServiceService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorage.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorage.getUser();
      const id = user.id;
      this.service.getTaskById(id).subscribe(
        data => {
          this.task = data.data
        }
      );


    }
  }

}

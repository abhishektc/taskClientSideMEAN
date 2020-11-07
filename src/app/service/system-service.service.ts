import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:4000/api/users/'
const TASK_API = 'http://localhost:4000/api/tasks/'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SystemServiceService {

  constructor(private http: HttpClient) { }

  //authentication
  login(val): Observable<any> {
    return this.http.post(AUTH_API + 'login', val, httpOptions);
  }

  //task management
  createTask(val): Observable<any> {
    return this.http.post(TASK_API + 'createTask', val, httpOptions);
  }

  getEmployee(): Observable<any> {
    return this.http.get(TASK_API + 'getEmployee');
  }

  getTaskById(id): Observable<any> {
    return this.http.get(`${TASK_API + 'getTaskByEmployeeId'}/${id}`);
  }

  updateTaskWithNotes(val): Observable<any> {
    return this.http.put(`${TASK_API + 'updateTaskWithNotes'}/${val.taskId}`, val);
  }

  getTaskByManagerId(id): Observable<any> {
    return this.http.get(`${TASK_API + 'getTaskByManagerId'}/${id}`);
  }

  getTaskByTaskId(id): Observable<any> {
    return this.http.get(`${TASK_API + '/getTaskByTaskId'}/${id}`);
  }

  updateTaskByTaskId(val): Observable<any> {
    return this.http.put(`${TASK_API + '/updateTaskByTaskId'}/${val._id}`, val);
  }
}

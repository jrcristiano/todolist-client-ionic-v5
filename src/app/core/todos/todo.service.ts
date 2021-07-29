import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const api = environment.api_url + '/api/v1/tasks';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  getOnDemandTasks(skip: number) {
    return this.http.get(`${api}?skip=${skip}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const url = environment.api_url + '/api/v1';
const api = url + '/tasks';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  getOnDemandTasks(skip: number) {
    return this.http.get(`${api}?skip=${skip}`);
  }

  updateByDragUpDown(params: any) {
    return this.http.put(`${url}/drag/up-down`, params)
      .subscribe(res => console.log(res));
  }

  updateByDragDownUp(params: any) {
    return this.http.put(`${url}/drag/down-up`, params)
      .subscribe(res => console.log(res));
  }
}

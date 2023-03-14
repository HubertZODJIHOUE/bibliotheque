import { Injectable } from '@angular/core';


import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http :HttpClient) {}

  private baseUrl = 'http://localhost:8033/api/books';



  getData() {
    return this.http.get(this.baseUrl + 'data');
  }

  postData(data: any) {
    return this.http.post(this.baseUrl + 'data', data);
  }

  putData(id: number, data: any) {
    return this.http.put(this.baseUrl + 'data/' + id, data);
  }

  deleteData(id: number) {
    return this.http.delete(this.baseUrl + 'data/' + id);
  }

}

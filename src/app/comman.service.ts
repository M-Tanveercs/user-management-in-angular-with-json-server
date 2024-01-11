import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommanService {
  readonly url = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}
  AddUpdateUser(user: any, type: any): Observable<any> {
    if (user.id == '') {
      delete user.id;
      debugger;
      return this.http.post(this.url + 'users', user);
    } else {
      return this.http.put(this.url + 'users/' + user.id, user);
    }
  }
  getAllUser(): Observable<any> {
    debugger;
    return this.http.get(this.url + 'users');
  }
  deleteUserById(ID: any): Observable<any> {
    debugger;
    return this.http.delete(this.url + 'users/' + ID);
  }
  getUserById(ID: any): Observable<any> {
    debugger;
    return this.http.get(this.url + 'users/' + ID);
  }
}

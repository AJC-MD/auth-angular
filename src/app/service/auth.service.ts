import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  // apiUrl = 'http://localhost:3000/user';
  env = environment.apiUrl + '/user';

  getAll() {
    return this.http.get(this.env);
  }

  getById(id: any) {
    return this.http.get(this.env + '/' + id);
  }

  register(user: User) {
    return this.http.post(this.env, user);
  }

  updateUser(user: User) {
    return this.http.put(this.env + '/' + user.id, user);
  }

  isLoggedIn() {
    return localStorage.getItem('userName') !== null;
  }

  getUserRole() {
    return localStorage.getItem('userRole') !== null ? sessionStorage.getItem('userRole')?.toString() : '';
  }
}

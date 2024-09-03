import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'http://localhost:4000/api/users';

  constructor(private http: HttpClient) { }

  createUser(user: User) {
    return this.http.post(`${this.baseUrl}/create`, user);
  }

  retrieveUser(id: string) {
    return this.http.get(`${this.baseUrl}/one?userId=${id}`);
  }

  retrieveAllUsers() {
    return this.http.get(`${this.baseUrl}/all`);
  }

  updateUser(user: User) {
    return this.http.put(`${this.baseUrl}/update`, user);
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.baseUrl}/delete?userId=${id}`);
  }
}

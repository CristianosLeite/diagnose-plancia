import { lastValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'http://localhost:4000/api/users';

  constructor(private http: HttpClient) { }

  createUser(user: User) {
    return this.http.post<User>(`${this.baseUrl}/create`, user);
  }

  async retrieveUser(id: string): Promise<User> {
    return await lastValueFrom(this.http.get<User>(`${this.baseUrl}/one?user_id=${id}`));
  }

  retrieveAllUsers() {
    return this.http.get<User[]>(`${this.baseUrl}/all`);
  }

  getUserByBadgeNumber(badgeNumber: number) {
    return this.http.get<User>(`${this.baseUrl}/badge?badge_number=${badgeNumber}`);
  }

  updateUser(user: User) {
    return this.http.put<User>(`${this.baseUrl}/update`, user);
  }

  deleteUser(id: string) {
    return this.http.delete<User>(`${this.baseUrl}/delete?user_id=${id}`);
  }
}

import { Injectable } from '@angular/core';
import { User } from './user';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public apiServerUrl = environment.backendURL;
  // user: User[] = [];

  currentUser : User | null;

  constructor(
    private http: HttpClient
  ) {
    this.currentUser = null;
   }

   addUser(loginUser:User) {
    this.currentUser = loginUser;
   }

   removeUser(loginUser:User) {
    this.currentUser = null;
   }

   getCurrentUser() {
     return this.currentUser;
   }


   // My-profile

   public getUsers():Observable<User[]> {
    return this.http.get<User[]>(`${this.apiServerUrl}/user/all`);
  }

  public onAddUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiServerUrl}/user/add`, user);
  }

  public updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiServerUrl}/user/update`, user);
  }

  public deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/user/delete/${userId}`);
  }


}


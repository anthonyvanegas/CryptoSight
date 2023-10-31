import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model'
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UserService {
    private users: User[] = [];
    private usersUpdated = new Subject<User[]>();

    constructor(private http: HttpClient) {}

    getUsers() {
        this.http.get<{message: string, users: User[]}>('http://localhost:3000/api/users')
        .subscribe((userData) => {
            this.users = userData.users;
            this.usersUpdated.next([...this.users]);
        });
    }

    getUsersUpdateListener() {
        return this.usersUpdated.asObservable();
    }

    addUser(user: User) {
        this.users.push(user)
        this.usersUpdated.next([...this.users])
    }
}
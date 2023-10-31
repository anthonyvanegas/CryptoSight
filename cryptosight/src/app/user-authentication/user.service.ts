import { Injectable } from '@angular/core';
import { User } from './user.model'
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UserService {
    private users: User[] = [];
    private usersUpdated = new Subject<User[]>();

    getUsers() {
        return [...this.users];
    }

    getUsersUpdateListener() {
        return this.usersUpdated.asObservable();
    }

    addUser(user: User) {
        this.users.push(user)
        this.usersUpdated.next([...this.users])
    }
}
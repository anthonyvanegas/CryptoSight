import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model'
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class UserService {
    private users: User[] = [];
    private usersUpdated = new Subject<User[]>();

    constructor(private http: HttpClient) {}

    getUsers() {
        this.http.get<{message: string, users: any}>(
            'http://localhost:3000/api/users'
        )
        .pipe(map((userData) => {
            return userData.users.map((user: { firstname: any; lastname: any; email: any; password: any; _id: any; }) => {
                return {
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    password: user.password,
                    id: user._id
                };
            });
        }))
        .subscribe((transformedUsers) => {
            this.users = transformedUsers;
            this.usersUpdated.next([...this.users]);
        });
    }

    getUsersUpdateListener() {
        return this.usersUpdated.asObservable();
    }

    addUser(user: User) {
        this.http
            .post<{message: string, postId: string }>('http://localhost:3000/api/users', user)
            .subscribe(responseData => {
                const id = responseData.postId;
                user.id = id;
                this.users.push(user)
                this.usersUpdated.next([...this.users])
            });
    }
}
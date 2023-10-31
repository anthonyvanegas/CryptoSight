import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {
  users: User[] = [];
  private usersSub: Subscription = new Subscription;

  constructor(public userService: UserService) {}

  ngOnInit() {
    this.users = this.userService.getUsers();
    this.usersSub = this.userService.getUsersUpdateListener().subscribe((users: User[]) => {
        this.users = users;
    });
  }

  ngOnDestroy() {
    this.usersSub.unsubscribe();
  }

  login(form: NgForm) {
      console.log(form.value.email)
      console.log(form.value.password)
  }
}

import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  currentUser : User | null = null;

  constructor(
    private userService:UserService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser();

  }

}

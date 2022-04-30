import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  public users : User[] =[];
  user: User | undefined;
  
  currentUser : User | null = null;

  profileData !: any;

  constructor(
    private myProfile : UserService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }


  //BE My Profile
  public editUser: User= {
    id: 0,
    firstName: '',
    lastName: '',
    age: 0,
    email: '',
    mobile: 0,
    password: '',
    confirmPassword: '',
    location_id: '',
    fullname: '',
    users_role: ''
  };  
  public deleteUser: User = {
    id: 0,
    firstName: '',
    lastName: '',
    age: 0,
    email: '',
    mobile: 0,
    password: '',
    confirmPassword: '',
    location_id: '',
    fullname: '',
    users_role: ''
  };
  public addUser: User = {
    id: 0,
    firstName: '',
    lastName: '',
    age: 0,
    email: '',
    mobile: 0,
    password: '',
    confirmPassword: '',
    location_id: '',
    fullname: '',
    users_role: ''
  };


  public getUsers(): void {
    this.myProfile.getUsers().subscribe(
      (response: User[]) => {
        this.profileData = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  url="https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg";

  onSelectFile(uploadImage: any){
    if(uploadImage.target.files){
      var image = new FileReader();
      image.readAsDataURL(uploadImage.target.files[0]);
      image.onload=(event:any)=>{
        this.url=event.target.result;
      }
    }
  }

}

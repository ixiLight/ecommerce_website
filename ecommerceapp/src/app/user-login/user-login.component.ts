import { UserService } from './../user.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../user';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  myid! : any;
  // returnUrl!: string;
  submitted = false;
  // loading = false;
  public loginForm !: FormGroup

  currentUser :User | null;

 constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private userService : UserService
  ) {
    this.currentUser = null;
  }
  ngOnInit(): void {

      this.onDisplay();

    this.loginForm = this.formBuilder.group({
      email:['', Validators.required],
      password:['', Validators.required]
    });

  }

  onDisplay() {
    this.myid = localStorage.getItem('formdata');
  }

  onSubmit() {
    localStorage.setItem("formdata", JSON.stringify(this.loginForm.value));
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

  }

  removeItem() {
    localStorage.removeItem('id');
  }

  onSignIn() {
    console.log("Button Login has been clicked!");
  }

  login(){
  this.http.get<any>("http://localhost:3000/signupUsers")
  .subscribe(response=>{
    const user = response.find((a:any)=>{
      return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
    });
    if(user){

      alert("Login Success");
      this.loginForm.reset();
 
      this.userService.addUser(user);
      this.router.navigate(['welcome-page'])
    } else {
      alert("User not Found.");
    }
  }, error=>{
    alert("Something went Wrong!")
  })
}

}

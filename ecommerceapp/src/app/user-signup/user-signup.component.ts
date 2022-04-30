import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from '../account.service';


@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent implements OnInit {

  signupForm!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient, 
    private router:Router,
    private route: ActivatedRoute,
    private accountService: AccountService,

    ) {
      if (this.accountService.userValue) {
        this.router.navigate(["welcome-page"]);
      }
     }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      fullname:['', Validators.required],
      email:['', Validators.required, Validators.email],
      mobile:['', Validators.required, Validators.pattern('^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$')],
      password:['', Validators.required, Validators.minLength(24)],
    })
  }

  signUp() {
    this.http.post<any>("http://localhost:3000/signUpUsers", this.signupForm.value)
    .subscribe(response=> {
      alert("Signup Sucessfull");
      this.signupForm.reset();
      this.router.navigate(['user-login']);
    },error=>{
      alert("Something went wrong")
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { SignUpService } from '../sign-up.service';
import { LoginService } from '../login.service';
import { User } from '../User/user';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css']
})
export class SignUpPageComponent implements OnInit {

  formdata : any;

  constructor(private signUpService: SignUpService, private loginService: LoginService) { }

  user: any;

  errorMessage: any;
  successMessage: any;

  ngOnInit() { 
    this.formdata = new FormGroup({ 
        email: new FormControl("myemail@domain.com"),
        password: new FormControl("!securePassword!"),
        first_name: new FormControl("John"),
        last_name: new FormControl("Black"),
        phone_number: new FormControl("2130929394"),
    }); 
  }

  onClickSubmit(data: any) {
    this.errorMessage = "";
    this.successMessage = "";

    this.user = new User(data.email, data.password,
      data.first_name, data.last_name, data.phone_number);

    this.loginService.Login(data.email).subscribe(response => {
      if(response){
        this.errorMessage = "Account with email " + data.email + " already exists."
      }else{
        this.signUpService.SignUp(this.user);
        this.successMessage = "You have successfuly signed up!"
      }
    });
  }
}

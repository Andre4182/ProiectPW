import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash"
  signUpForm!:FormGroup
    constructor(private fb:FormBuilder, private auth: AuthService, private router:Router, private toast:NgToastService){
      this.signUpForm=this.fb.group({
        firstName:['',Validators.required],
        lastName:['',Validators.required],
        userName: ['',Validators.required],
        email: ['',Validators.required],
        password: ['',Validators.required],
        role:"user"
      })
    }
  ngOnInit(): void {
    
  }
  hideShowPass(){
    this.isText=!this.isText;
    this.isText? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText? this.type = "text" : this.type = "password";
  }
  onSignUp(){
    if(this.signUpForm.valid){
      //console.log(this.signUpForm.value);

      this.auth.signUp(this.signUpForm.value)
      .subscribe({
        next:(res=>{
          this.toast.success({detail:"SUCCES", summary:res.message, duration: 5000})
          this.signUpForm.reset();
          this.router.navigate(['login']);
    })
        ,error:(err=>{
          this.toast.error({detail:"ERROR", summary:"Sign Up failed, check username, email and password ", duration: 5000})
        })
      })
  
    }else{
      //logic for throwing error
      ValidateForm.validateAllFormFields(this.signUpForm)
    }
  }

}

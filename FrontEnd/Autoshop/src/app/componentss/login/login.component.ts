import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastModule, NgToastService } from 'ng-angular-popup';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
type: string = "password";
isText: boolean = false;
eyeIcon: string = "fa-eye-slash"
loginForm!:FormGroup
  constructor(private fb:FormBuilder,
              private auth: AuthService, 
              private router: Router,
              private toast:NgToastService ){
this.loginForm=this.fb.group({
  username:['',Validators.required],
  password:['',Validators.required] 
})
  }
ngOnInit(): void {
  
}
hideShowPass(){
  this.isText=!this.isText;
  this.isText? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
  this.isText? this.type = "text" : this.type = "password";
}
onLogin(){
  if(this.loginForm.valid){
   // console.log(this.loginForm.value)
    this.auth.login(this.loginForm.value)
    .subscribe({
        next:(res=>{
          this.auth.storeToken(res.token);
          console.log("")
          this.toast.success({detail:"SUCCES", summary:res.message, duration: 5000})
          this.router.navigate(['cars']);
    })
        ,error:(err=>{
          this.toast.error({detail:"ERROR", summary:"Login failed", duration: 5000})
        })
      })
  
  }else{
    //throw the error using toaster and with req fields

    ValidateForm.validateAllFormFields(this.loginForm);
    alert("Your form is invalid");
  }
}


}

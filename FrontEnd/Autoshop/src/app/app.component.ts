import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  router: any;
  toast: any;
  constructor(private auth: AuthService){}
  title = 'Autoshop';
  subtitle = 'Ceva';
  optional = '';
  Click(){
    this.title = "WOW";
    this.subtitle = "zebra";
  }
  Click2(){
    this.title = "Autoshop";
    this.subtitle = "Ceva";
  }
  receiveData(ceva:string){
    this.optional = ceva;
  }
  isLoggedIn(){
    return this.auth.isLoggedIn();
  }
  isLoggedOut(){
    return !this.auth.isLoggedIn();
  }
  logOut(){
    this.auth.signOut();
    this.toast.success({detail:"SUCCES", summary:"You have been logged out!", duration: 5000})
    this.router.navigate(['/home']);
  }
}


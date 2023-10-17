import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { XyzComponent } from './xyz/xyz.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { LoginComponent } from './componentss/login/login.component';
import { SignupComponent } from './componentss/signup/signup.component'; 
import { ReactiveFormsModule } from '@angular/forms';
import { NgToastModule } from 'ng-angular-popup'
import { AuthService } from './services/auth.service';


@NgModule({
  declarations: [
    AppComponent,
    XyzComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgToastModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 

}

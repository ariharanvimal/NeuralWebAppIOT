import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  NgbModule,
  NgbAlertModule,
  NgbCollapse,
} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { HomeComponent } from './Components/home/home.component';
import { NavBarNEORComponent } from './Components/nav-bar-neor/nav-bar-neor.component';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { DevconfoperComponent } from './Components/devconfoper/devconfoper.component';
import { DevicesComponent } from './Components/devices/devices.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    NavBarNEORComponent,
    DevconfoperComponent,
    DevicesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgbAlertModule,
    NgbCollapse,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

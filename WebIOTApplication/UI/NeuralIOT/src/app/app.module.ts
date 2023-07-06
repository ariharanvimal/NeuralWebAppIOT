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
import { DevicesComponent } from './Components/devices/devices.component';
import { NavBarNEORComponent } from './Components/nav-bar-neor/nav-bar-neor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DevconfoperComponent } from './Components/devconfoper/devconfoper.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    DevicesComponent,
    NavBarNEORComponent,
    DevconfoperComponent,
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

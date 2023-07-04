import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  NgbModule,
  NgbAlertModule,
  NgbCollapse,
} from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { HomeComponent } from './Components/home/home.component';
import { DevicesComponent } from './Components/devices/devices.component';
import { NavBarNEORComponent } from './Components/nav-bar-neor/nav-bar-neor.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    DevicesComponent,
    NavBarNEORComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgbAlertModule,
    NgbCollapse,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MqttModule } from 'ngx-mqtt';
import { mqttServiceOptions } from 'src/Config/MQTT/mqttConfig';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { MqttDashboardComponent } from './Components/mqtt-dashboard/mqtt-dashboard.component';
import { TopNavBarComponent } from './Components/top-nav-bar/top-nav-bar.component';
import { HomeComponent } from './Components/home/home.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, SignupComponent, MqttDashboardComponent, TopNavBarComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MqttModule.forRoot(mqttServiceOptions),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

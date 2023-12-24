import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TopNavBarComponent } from './Components/top-nav-bar/top-nav-bar.component';
import { MqttDashboardComponent } from './Components/mqtt-dashboard/mqtt-dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    TopNavBarComponent,
    MqttDashboardComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'neuraliot';
}

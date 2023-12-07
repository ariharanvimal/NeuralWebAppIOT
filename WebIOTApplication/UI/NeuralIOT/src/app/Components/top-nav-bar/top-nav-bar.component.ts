import { Component } from '@angular/core';

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.css'],
})
export class TopNavBarComponent {
  collapsed = true;

  toogle_collapsed(): void {
    this.collapsed = !this.collapsed;
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar-neor',
  templateUrl: './nav-bar-neor.component.html',
  styleUrls: ['./nav-bar-neor.component.css'],
})
export class NavBarNEORComponent {
  collapsed = true;

  toogle_collapsed(): void {
    this.collapsed = !this.collapsed;
  }
}

import { Component } from '@angular/core';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-top-nav-bar',
  standalone: true,
  imports: [NgbCollapse],
  templateUrl: './top-nav-bar.component.html',
  styleUrl: './top-nav-bar.component.css',
})
export class TopNavBarComponent {
  collapsed = true;

  toogle_collapsed(): void {
    this.collapsed = !this.collapsed;
  }
}

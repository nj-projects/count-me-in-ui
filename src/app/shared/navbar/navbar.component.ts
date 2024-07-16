import {Component, inject, signal} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {RouterLink} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatIcon,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  location = inject(Location);
  currentUrl = signal('');


  constructor() {
  }

  updateUrl() {
    console.log(this.location.path())
    this.currentUrl.set(this.location.path());
  }

}

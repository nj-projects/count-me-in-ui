import {Component} from '@angular/core';
import {CreateComponent} from "../../components/event/create/create.component";
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from "@angular/material/sidenav";
import {ListComponent} from "../../components/event/list/list.component";
import {MatIcon} from "@angular/material/icon";
import {RouterLink} from "@angular/router";
import {routes} from "../../app.routes";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-event-management',
  standalone: true,
  imports: [
    CreateComponent,
    MatDrawerContent,
    MatDrawerContainer,
    MatDrawer,
    ListComponent,
    MatIcon,
    RouterLink,
    MatButton
  ],
  templateUrl: './event-management.component.html',
  styleUrl: './event-management.component.scss'
})
export class EventManagementComponent {

  protected readonly routes = routes;
}

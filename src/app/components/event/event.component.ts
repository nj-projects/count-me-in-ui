import {Component, effect, inject, OnInit} from '@angular/core';
import {EventService} from "./event.service";
import {EventResponse} from "./model/event.model";
import {DatePipe} from "@angular/common";
import {DateCardComponent} from "../date-container/date-card/date-card.component";
import {DateContainerComponent} from "../date-container/date-container.component";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {NgbCarouselModule, NgbToast} from "@ng-bootstrap/ng-bootstrap";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [
    DatePipe,
    DateCardComponent,
    DateContainerComponent,
    MatButton,
    RouterLink,
    NgbCarouselModule,
    NgbToast
  ],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss'
})
export class EventComponent implements OnInit {
  eventService = inject(EventService);
  snackBar = inject(MatSnackBar);

  events: EventResponse[] = [];
  event: EventResponse | undefined = undefined;
  loading: boolean = false;
  serverOffline: boolean = false;
  defaultImage = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=3764&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  constructor() {
    this.listenGetAllEvents();
    this.snackBar.open("This is a demo application. Initial requests can be delayed by 50 seconds or more.", 'Close');
  }

  ngOnInit(): void {
    this.getAllEvents();
  }

  private getAllEvents() {
    this.loading = true
    this.eventService.list();
  }

  private listenGetAllEvents() {
    effect(() => {
      const allEvents = this.eventService.listSignal();
      if (allEvents.status == 'OK' && allEvents.value) {
        this.loading = false;
        this.serverOffline = false;
        this.events = allEvents.value;
      } else {
        this.serverOffline = true;
      }
    });
  }
}

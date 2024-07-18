import {Component, effect, inject, OnInit} from '@angular/core';
import {EventService} from "./event.service";
import {EventResponse} from "./model/event.model";
import {DatePipe} from "@angular/common";
import {DateCardComponent} from "../date-container/date-card/date-card.component";
import {DateContainerComponent} from "../date-container/date-container.component";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {NgbCarouselModule} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [
    DatePipe,
    DateCardComponent,
    DateContainerComponent,
    MatButton,
    RouterLink,
    NgbCarouselModule
  ],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss'
})
export class EventComponent implements OnInit {
  eventService = inject(EventService);
  events: EventResponse[] = [];
  event: EventResponse | undefined = undefined;
  loading: boolean = false;
  // todo - add image url to api
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  constructor() {
    this.listenGetAllEvents();
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
        this.events = allEvents.value;
      }
    });
  }
}

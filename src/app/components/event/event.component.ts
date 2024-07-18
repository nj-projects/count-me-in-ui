import {Component, effect, inject, OnInit} from '@angular/core';
import {EventService} from "./event.service";
import {EventResponse} from "./model/event.model";
import {DatePipe} from "@angular/common";
import {count} from "rxjs";
import {DateCardComponent} from "../date-container/date-card/date-card.component";
import {DateContainerComponent} from "../date-container/date-container.component";
import {CustomDate} from "../date-container/model/date.model";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [
    DatePipe,
    DateCardComponent,
    DateContainerComponent,
    MatButton,
    RouterLink
  ],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss'
})
export class EventComponent implements OnInit {
  eventService = inject(EventService);
  events: EventResponse[] = [];
  event: EventResponse | undefined = undefined;
  loading: boolean = false;
  countdown: string = "";
  customDate = {} as CustomDate;

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
        this.event = allEvents.value[0];
        this.setCountdown();
      }
    });
  }

  protected readonly count = count;

  private setCountdown() {
    if (this.events.length > 0) {
      setInterval(() => {
        const now = new Date().getTime();
        const toDate = Date.parse(this.event!.date) - now;
        this.customDate.days = Math.floor(toDate / (1000 * 60 * 60 * 24));
        this.customDate.hours = Math.floor((toDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        this.customDate.mins = Math.floor((toDate % (1000 * 60 * 60)) / (1000 * 60));
        this.customDate.secs = Math.floor((toDate % (1000 * 60)) / (1000));
      })
    }
  }
}

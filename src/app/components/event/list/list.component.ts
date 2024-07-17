import {Component, effect, inject, OnInit} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {EventService} from "../event.service";
import {EventResponse} from "../model/event.model";
import {MatIcon} from "@angular/material/icon";
import {RouterLink} from "@angular/router";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef,
    MatHeaderRow,
    MatRow,
    MatIcon,
    RouterLink,
    MatButton
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {

  eventService = inject(EventService);
  events: EventResponse[] = [];
  loading: boolean = false;
  displayedColumns: string[] = ['name', 'description', 'date', 'update / delete'];
  dataSource = new MatTableDataSource(this.events);

  constructor() {
    this.listenGetAllEvents();
    this.listenDeleteEvent();
  }

  ngOnInit(): void {
    this.getAllEvents();
  }

  deleteEvent(publicId: string): void {
    this.eventService.delete(publicId);
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
        this.dataSource.data = allEvents.value
      }
    });
  }

  private listenDeleteEvent() {
    effect(() => {
      const deleteStatus = this.eventService.deleteSignal();
      const deleteId = this.eventService.deleteIdSignal();
      if (deleteStatus.value?.statusText == 'OK') {
        const eventIndexToDelete =
          this.events?.findIndex(event => event.publicId === deleteId.value);
        this.events?.splice(eventIndexToDelete!, 1);
        this.dataSource.data = this.events;
      }
    });
  }
}
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
  MatTable
} from "@angular/material/table";
import {EventService} from "../event.service";
import {EventResponse} from "../model/event.model";

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
    MatRow
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {

  eventService = inject(EventService);
  events: EventResponse[] | undefined = [];
  loading: boolean = false;
  displayedColumns: string[] = ['name', 'description', 'date'];
  dataSource: EventResponse[] = [];

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
        this.dataSource = allEvents.value
      }
    });
  }
}

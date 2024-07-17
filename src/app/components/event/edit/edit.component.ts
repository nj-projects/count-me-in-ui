import {Component, effect, inject, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {MatNativeDateModule} from "@angular/material/core";
import {EventService} from "../event.service";
import {EventRequest, EventResponse} from "../model/event.model";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {CustomDate} from "../../date-container/model/date.model";
import moment from "moment";

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatInputModule,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerModule,
    MatHint,
    MatLabel,
    MatNativeDateModule,
    MatButton,
    RouterLink,
    ReactiveFormsModule
  ],
  providers: [MatDatepickerModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent implements OnInit {
  eventService = inject(EventService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  fb = inject(FormBuilder);

  event: EventResponse | undefined = undefined;
  updatedEvent = {} as EventRequest;
  publicId: string | null = '';
  loading: boolean = false;

  form = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    date: ['', Validators.required],
  })

  constructor() {
    this.listenToGetEvent();
  }

  ngOnInit(): void {
    this.publicId = this.route.snapshot.paramMap.get('id');
    this.getEvent();
  }

  updateEvent() {
    this.updatedEvent.name = this.form.value.name!;
    this.updatedEvent.description = this.form.value.description!;
    this.updatedEvent.date = moment(this.form.value.date!).format('DD-MM-yyyy');
    this.eventService.update(this.publicId!, this.updatedEvent);
    this.router.navigate(['']);
  }

  private listenToGetEvent() {
    effect(() => {
      const event = this.eventService.eventSignal();

      if (event.status === 'OK' && event.value) {
        this.loading = false;
        this.event = event.value;
        this.form.patchValue({
          name: event.value.name,
          description: event.value.description,
          date: event.value.date,
        })
      }
    });
  }

  private getEvent() {
    this.loading = true;
    if (this.publicId != null) {
      this.eventService.get(this.publicId);
    }
  }
}
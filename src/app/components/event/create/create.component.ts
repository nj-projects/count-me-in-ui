import {Component, effect, inject, OnDestroy} from '@angular/core';
import {MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatButton} from "@angular/material/button";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {EventService} from "../event.service";
import moment from "moment/moment";
import {EventRequest} from "../model/event.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-create',
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
    ReactiveFormsModule,
    MatProgressSpinner
  ],
  providers: [MatDatepickerModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent implements OnDestroy {

  eventService = inject(EventService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  fb = inject(FormBuilder);
  snackBar = inject(MatSnackBar);
  loading: boolean = false;

  event = {} as EventRequest;

  form = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    date: ['', Validators.required],
    imageUrl: ['']
  })

  constructor() {
    this.listenCreateEvent();
  }

  ngOnDestroy(): void {
    this.eventService.resetCreate();
  }


  createEvent() {
    this.loading = true;
    this.event.name = this.form.value.name!;
    this.event.description = this.form.value.description!;
    this.event.date = moment(this.form.value.date!).format('DD-MM-yyyy').toString();

    try {
      let url = new URL(this.form.value.imageUrl!);
      if (url.protocol === 'http:' || url.protocol === 'https:') {
        this.event.imageUrl = this.form.value.imageUrl!;
      }
    } catch (err) {
      this.event.imageUrl = '';
    }

    this.eventService.create(this.event);

  }

  private listenCreateEvent() {
    effect(() => {
      const newEvent = this.eventService.createSignal();
      if (newEvent.status === 'OK' && newEvent.value) {
        this.loading = false;
        this.resetEvent();
        this.snackBar.open("Event created", 'Success', {
          duration: 5000,
        });
        this.router.navigate(['/management'])
      }
    })
  }

  private resetEvent() {
    this.event = {} as EventRequest;
    this.form.reset();
  }
}

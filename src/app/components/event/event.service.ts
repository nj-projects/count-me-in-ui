import {computed, inject, Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {State} from "../../core/model/state.model";
import {EventRequest, EventResponse} from "./model/event.model";
import {environment} from "../../../environments/environment.development";


@Injectable({
  providedIn: 'root'
})
export class EventService {
  http = inject(HttpClient);

  constructor() {
  }

  private create$: WritableSignal<State<EventResponse>> = signal(State.Builder<EventResponse>().forInit());
  createSignal = computed(() => this.create$());

  private list$: WritableSignal<State<EventResponse[]>> = signal(State.Builder<EventResponse[]>().forInit());
  listSignal = computed(() => this.list$());

  create(eventRequest: EventRequest) {
    this.http.post<EventResponse>(`${environment.API_URL}/event`, eventRequest)
      .subscribe({
        next: event => this.create$.set(State.Builder<EventResponse>().forSuccess(event)),
        error: err => this.create$.set(State.Builder<EventResponse>().forError(err))
      });
  }

  list() {
    this.http.get<EventResponse[]>(`${environment.API_URL}/event`)
      .subscribe({
        next: events => this.list$.set(State.Builder<EventResponse[]>().forSuccess(events)),
        error: err => this.list$.set(State.Builder<EventResponse[]>().forError(err))
      })
  }
}

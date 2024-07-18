import {computed, inject, Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
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

  private event$: WritableSignal<State<EventResponse>> = signal(State.Builder<EventResponse>().forInit());
  eventSignal = computed(() => this.event$());

  private updatedEvent$: WritableSignal<State<EventResponse>> = signal(State.Builder<EventResponse>().forInit());
  updatedEventSignal = computed(() => this.updatedEvent$());

  private delete$: WritableSignal<State<HttpResponse<any>>> = signal(State.Builder<HttpResponse<any>>().forInit());
  deleteSignal = computed(() => this.delete$());

  private deleteId$: WritableSignal<State<string>> = signal(State.Builder<string>().forInit());
  deleteIdSignal = computed(() => this.deleteId$());

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

  get(publicId: string) {
    this.http.get<EventResponse>(`${environment.API_URL}/event/${publicId}`)
      .subscribe({
        next: event => this.event$.set(State.Builder<EventResponse>().forSuccess(event)),
        error: err => this.event$.set(State.Builder<EventResponse>().forError(err))
      })
  }

  update(publicId: string, event: EventRequest) {
    this.http.put<EventResponse>(`${environment.API_URL}/event/${publicId}`, event)
      .subscribe({
        next: event => this.updatedEvent$.set(State.Builder<EventResponse>().forSuccess(event)),
        error: err => this.updatedEvent$.set(State.Builder<EventResponse>().forError(err))
      })
  }

  delete(publicId: string) {
    this.http.delete<HttpResponse<any>>(`${environment.API_URL}/event/${publicId}`, {
      observe: 'response'
    })
      .subscribe({
          next: result => {
            this.delete$.set(State.Builder<HttpResponse<any>>().forSuccess(result))
            this.deleteId$.set(State.Builder<string>().forSuccess(publicId))
          },
          error: err => this.delete$.set(State.Builder<HttpResponse<any>>().forError(err))
        }
      )
  }

  resetCreate() {
    this.create$.set(State.Builder<EventResponse>().forInit());
  }

  resetDelete() {
    this.delete$.set(State.Builder<HttpResponse<any>>().forInit());
    this.deleteId$.set(State.Builder<string>().forInit());
  }

  resetUpdate() {
    this.updatedEvent$.set(State.Builder<EventResponse>().forInit());
  }


}



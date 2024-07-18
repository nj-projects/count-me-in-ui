import {CustomDate} from "../../date-container/model/date.model";

export interface EventRequest {
  name: string,
  description: string,
  date: string,
}

export interface EventResponse {
  name: string,
  description: string,
  date: string,
  publicId: string,
}

export interface EventWithCountdown {
  event: EventResponse,
  customDate: CustomDate
}

export interface EventRequest {
  name: string,
  description: string,
  date: string,
  imageUrl: string
}

export interface EventResponse {
  name: string,
  description: string,
  date: string,
  imageUrl: string
  publicId: string,
}

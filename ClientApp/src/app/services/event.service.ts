// Generated through command line
// PM> cd .\ClientApp\src\app\services
// PM> ng generate service event

import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event } from '../models/Event';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EventService {
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.baseUrl}api/events`);
  }

  getEventsByTopic(topic: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.baseUrl}api/events/topics/${topic}`);
  }

  getEventsById(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.baseUrl}api/events/${id}`);
  }

  postEvent(event: Event) {
    return this.http.post(`${this.baseUrl}api/events/`, event);
  }

  putEvent(event: Event) {
    return this.http.put(`${this.baseUrl}api/events/${event.id}`, event);
  }

  deleteEvent(id: number) {
    return this.http.delete(`${this.baseUrl}api/events/${id}`);
  }

  postUpload(file: File, name: string) {
    const fileToUpload = file[0] as File;
    const formData = new FormData();
    formData.append('file', fileToUpload, name);

    return this.http.post(`${this.baseUrl}api/events/upload`, formData);
  }
}

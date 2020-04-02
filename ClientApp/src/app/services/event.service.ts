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
    return this.http.get<Event[]>(`${ this.baseUrl }api/events`);
  }

  getEventsByTopic(topic: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${ this.baseUrl }api/events/topics/${ topic }`);
  }

  getEventsById(id: number): Observable<Event> {
    return this.http.get<Event>(`${ this.baseUrl }api/events/${ id }`);
  }
}

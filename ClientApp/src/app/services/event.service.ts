// Generated through command line 'PM > ng generate service event'

import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event } from '../models/Event';

@Injectable({
  providedIn: 'root'
})

export class EventService {
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getEvent() {
    return this.http.get<Event[]>(this.baseUrl + 'api/events');
  }
}

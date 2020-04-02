// Generated through command line
// PM> cd .\ClientApp\src\app\fetch-data
// PM> ng generate component event

import { Component, OnInit } from '@angular/core';
import { Event } from '../../models/Event';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})

export class EventComponent implements OnInit {
  private events: Event[];
  private filteredEvents: Event[];

  private imageWidth = 50;
  private imageMargin = 2;

  private showImage = false;

  private _termsSearch: string;
  get termsSearch() {
    return this._termsSearch;
  }
  set termsSearch(value: string) {
    this._termsSearch = value;
    this.filteredEvents = this.termsSearch ? this.filterEvents(this.termsSearch) : this.events;
  }

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.getEvents().subscribe((_eventos: Event[]) => {
      this.events = _eventos;
      this.filteredEvents = _eventos;
    }, error => console.error(error));
  }

  toggleImage() {
    this.showImage = !this.showImage;
  }

  filterEvents(termsSearch: string): Event[] {
    termsSearch = termsSearch.toLocaleLowerCase();
    return this.events.filter(
      event => event.topic.toLocaleLowerCase().indexOf(termsSearch) !== -1
    );
  }
}

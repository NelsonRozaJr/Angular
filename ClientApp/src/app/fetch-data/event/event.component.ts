import { Component } from '@angular/core';
import { Event } from '../../models/Event';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './event.component.html'
})

export class EventsComponent {
  public events: Event[];
  public filteredEvents: Event[];

  private _termsSearch: string;
  get termsSearch() {
    return this._termsSearch;
  }
  set termsSearch(value: string) {
    this._termsSearch = value;
    this.filteredEvents = this.termsSearch ? this.filterEvents(this.termsSearch) : this.events;
  }

  constructor(private eventService: EventService) {
    this.eventService.getEvent().subscribe(result => {
      this.events = result;
      this.filteredEvents = result;
    }, error => console.error(error));
  }

  filterEvents(termsSearch: string): Event[] {
    termsSearch = termsSearch.toLocaleLowerCase();
    return this.events.filter(
      event => event.topic.toLocaleLowerCase().indexOf(termsSearch) !== -1
    );
  }
}

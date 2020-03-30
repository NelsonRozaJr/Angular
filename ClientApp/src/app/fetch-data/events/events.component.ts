import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html'
})

export class EventsComponent {
  public events: Events[];
  public filteredEvents: Events[];

  private _termsSearch: string;
  get termsSearch() {
    return this._termsSearch;
  }
  set termsSearch(value: string) {
    this._termsSearch = value;
    this.filteredEvents = this.termsSearch ? this.filterEvents(this.termsSearch) : this.events;
  }

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Events[]>(baseUrl + 'api/events').subscribe(result => {
      this.events = result;
      this.filteredEvents = result;
    }, error => console.error(error));
  }

  filterEvents(termsSearch: string): Events[] {
    termsSearch = termsSearch.toLocaleLowerCase();
    return this.events.filter(
      event => event.topic.toLocaleLowerCase().indexOf(termsSearch) !== -1
    );
  }
}

interface Events {
  id: number;
  city: string;
  topic: string;
  subscribers: number;
  group: string;
  date: string;
}

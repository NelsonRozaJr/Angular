// Generated through command line
// PM> cd .\ClientApp\src\app\components
// PM> ng generate component event

import { Component, OnInit, TemplateRef } from '@angular/core';
import { Event } from '../../models/Event';
import { EventService } from '../../services/event.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
  private registerForm: FormGroup;

  private _termsSearch: string;
  get termsSearch() {
    return this._termsSearch;
  }
  set termsSearch(value: string) {
    this._termsSearch = value;
    this.filteredEvents = this.termsSearch ? this.filterEvents(this.termsSearch) : this.events;
  }

  constructor(private eventService: EventService, private modalService: BsModalService, private modalRef: BsModalRef) { }

  ngOnInit(): void {
    this.validation();
    this.getEvents();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
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

  getEvents() {
    this.eventService.getEvents().subscribe((_eventos: Event[]) => {
      this.events = _eventos;
      this.filteredEvents = _eventos;
    }, error => console.error(error));
  }

  validation() {
    this.registerForm = new FormGroup({
      city: new FormControl('', [Validators.required]),
      topic: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]),
      subscribers: new FormControl('', [Validators.required, Validators.max(1000)]),
      phone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      date: new FormControl('', [Validators.required]),
      imageFile: new FormControl('', [Validators.required])
    });
  }

  saveChanges() {

  }
}

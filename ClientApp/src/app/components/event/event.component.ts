// Generated through command line
// PM> cd .\ClientApp\src\app\components
// PM> ng generate component event

import { Component, OnInit } from '@angular/core';
import { Event } from '../../models/Event';
import { EventService } from '../../services/event.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { defineLocale, BsLocaleService, ptBrLocale } from 'ngx-bootstrap';
defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})

export class EventComponent implements OnInit {
  private event: Event;
  private events: Event[];
  private filteredEvents: Event[];
  private imageWidth = 50;
  private imageMargin = 2;
  private showImage = false;
  private registerForm: FormGroup;
  private isNewEvent: boolean;
  private messageDeleteEvent: string;

  private _termsSearch: string;
  get termsSearch() {
    return this._termsSearch;
  }
  set termsSearch(value: string) {
    this._termsSearch = value;
    this.filteredEvents = this.termsSearch ? this.filterEvents(this.termsSearch) : this.events;
  }

  constructor(private eventService: EventService,
    private formBuilder: FormBuilder,
    private localeService: BsLocaleService) {
      this.localeService.use('pt-br');
  }

  ngOnInit(): void {
    this.validation();
    this.getEvents();
  }

  newEvent(template: any) {
    this.isNewEvent = true;
    this.openModal(template);
  }

  editEvent(event: Event, template: any) {
    this.openModal(template);
    this.event = event;
    this.registerForm.patchValue(event);
  }

  deleteEvent(event: Event, template: any) {
    template.show();
    this.event = event;
    this.messageDeleteEvent = `Tem certeza que deseja excluir o evento '${ event.topic }' (#${ event.id })?`;
  }

  confirmDelete(template: any) {
    this.eventService.deleteEvent(this.event.id).subscribe(
      () => {
        template.hide();
        this.getEvents();
      }, error => {
        console.log(error);
      }
    );
  }

  openModal(template: any) {
    this.registerForm.reset();
    template.show();
  }

  closeModal(template: any) {
    template.hide();
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
    this.eventService.getEvents().subscribe((_events: Event[]) => {
      this.events = _events;
      this.filteredEvents = _events;
    }, error => console.error(error));
  }

  validation() {
    this.registerForm = this.formBuilder.group({
      city: ['', [Validators.required]],
      topic: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      subscribers: ['', [Validators.required, Validators.max(1000)]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      date: ['', [Validators.required]],
      imageFile: ['', [Validators.required]]
    });
  }

  saveChanges(template: any) {
    if (this.registerForm.valid) {
      if (this.isNewEvent) {
        this.event = Object.assign({}, this.registerForm.value);
        this.eventService.postEvent(this.event).subscribe(
          () => {
            template.hide();
            this.getEvents();
          }, error => {
            console.log(error);
          }
        );
      }
      else {
        console.log('1');
        this.event = Object.assign({ id: this.event.id }, this.registerForm.value);
        this.eventService.putEvent(this.event).subscribe(
          () => {
            template.hide();
            this.getEvents();
          }, error => {
            console.log(error);
          }
        );
      }
    }
  }
}

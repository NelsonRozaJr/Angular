// Generated through command line
// PM> cd .\ClientApp\src\app\components
// PM> ng generate component event

import { Component, OnInit } from '@angular/core';
import { Event } from '../../models/Event';
import { EventService } from '../../services/event.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { defineLocale, BsLocaleService, ptBrLocale } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';

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
  private title = 'Events';
  private file: File;
  private currentDate: string;
  private fileNameToUpdate: string;

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
    private localeService: BsLocaleService,
    private toastr: ToastrService) {
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
    this.isNewEvent = false;
    this.openModal(template);

    this.event = Object.assign({}, event);
    this.fileNameToUpdate = event.imageFile.toString();
    this.event.imageFile = '';
    this.event.date = new Date(event.date);

    this.registerForm.patchValue(this.event);
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
        this.toastr.success('Evento excluído com sucesso.');
      }, error => {
        this.toastr.error(`Erro ao excluir evento: ${error}`);
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
    this.currentDate = new Date().getMilliseconds().toString();
    this.eventService.getEvents().subscribe((_events: Event[]) => {
      this.events = _events;
      this.filteredEvents = _events;
    }, error => {
        this.toastr.error(`Erro ao carregar eventos: ${error}`);
    });
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

  uploadImagem() {
    if (this.isNewEvent) {
      const fileName = this.event.imageFile.split('\\', 3);
      this.event.imageFile = fileName[2];

      this.eventService.postUpload(this.file, fileName[2])
        .subscribe(
          () => {
            this.currentDate = new Date().getMilliseconds().toString();
            this.getEvents();
          }
        );
    } else {
      this.event.imageFile = this.fileNameToUpdate;

      this.eventService.postUpload(this.file, this.fileNameToUpdate)
        .subscribe(
          () => {
            this.currentDate = new Date().getMilliseconds().toString();
            this.getEvents();
          }
        );
    }
  }

  onFileChange(event) {
    if (event.target.files && event.target.files.length) {
      this.file = event.target.files;
    }
  }

  saveChanges(template: any) {
    if (this.registerForm.valid) {
      if (this.isNewEvent) {
        this.event = Object.assign({}, this.registerForm.value);
        this.uploadImagem();
        this.eventService.postEvent(this.event).subscribe(
          () => {
            template.hide();
            this.getEvents();
            this.toastr.success('Evento criado com sucesso.');
          }, error => {
            this.toastr.error(`Erro ao criar evento: ${error}`);
          }
        );
      }
      else {
        this.event = Object.assign({ id: this.event.id }, this.registerForm.value);
        this.uploadImagem();
        this.eventService.putEvent(this.event).subscribe(
          () => {
            template.hide();
            this.getEvents();
            this.toastr.success('Evento atualizado com sucesso.');
          }, error => {
            this.toastr.error(`Erro ao atualizar evento: ${error}`);
          }
        );
      }
    }
  }
}

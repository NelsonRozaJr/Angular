// Generated through command line
// PM> cd .\ClientApp\src\app\components\event
// PM> ng generate component event-edit

import { Component, OnInit } from '@angular/core';
import { Event } from '../../../models/Event';
import { EventService } from '../../../services/event.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})

export class EventEditComponent implements OnInit {
  private event: Event = new Event();
  private registerForm: FormGroup;
  private fileNameToUpdate: string;
  private currentDate: string;
  private file: File;
  private pageTitle = 'Editar evento';
  private imageFile = 'assets/img/upload.png';

  get groups(): FormArray {
    return this.registerForm.get('groups') as FormArray;
  }

  get socialMedias(): FormArray {
    return this.registerForm.get('socialMedias') as FormArray;
  }

  constructor(private eventService: EventService,
    private formBuilder: FormBuilder,
    private localeService: BsLocaleService,
    private toastr: ToastrService,
    private router: ActivatedRoute) {
      this.localeService.use('pt-br');
  }

  ngOnInit(): void {
    this.validation();
    this.getEvent();
  }

  validation() {
    this.registerForm = this.formBuilder.group({
      id: [],
      city: ['', [Validators.required]],
      topic: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      subscribers: ['', [Validators.required, Validators.max(1000)]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      date: ['', [Validators.required]],
      imageFile: [''],
      groups: this.formBuilder.array([]),
      socialMedias: this.formBuilder.array([])
    });
  }

  getEvent() {
    this.currentDate = new Date().getMilliseconds().toString();
    const eventId: number = +this.router.snapshot.paramMap.get('id');
    this.eventService.getEventsById(eventId).subscribe(
      (event: Event) => {
        this.event = Object.assign({}, event);
        this.fileNameToUpdate = event.imageFile.toString();
        this.imageFile = `resources/images/${event.imageFile}?_ts=${this.currentDate}`;
        this.event.imageFile = '';
        this.event.date = new Date(event.date);

        this.registerForm.patchValue(this.event);

        this.event.groups.forEach(group => {
          this.groups.push(this.createGroup(group));
        });

        this.event.socialMedias.forEach(socialMedia => {
          this.socialMedias.push(this.createSocialMedia(socialMedia));
        });
      }
    );
  }

  createGroup(group: any): FormGroup {
    return this.formBuilder.group({
      id: [group.id],
      name: [group.name, [Validators.required]],
      price: [group.price, [Validators.required]],
      quantity: [group.quantity, [Validators.required]],
      initialDate: [group.initialDate],
      endDate: [group.endDate]
    });
  }

  createSocialMedia(socialMedia: any): FormGroup {
    return this.formBuilder.group({
      id: [socialMedia.id],
      name: [socialMedia.name, [Validators.required]],
      url: [socialMedia.url, [Validators.required]]
    });
  }

  addGroup() {
    this.groups.push(this.createGroup({ id: 0 }));
  }

  addSocialMedia() {
    this.socialMedias.push(this.createSocialMedia({ id: 0 }));
  }

  removeGroup(id: number) {
    this.groups.removeAt(id);
  }

  removeSocialMedia(id: number) {
    this.socialMedias.removeAt(id);
  }

  onFileChange(file: FileList) {
    const reader = new FileReader();
    reader.onload = (event: any) => this.imageFile = event.target.result;
    //this.file = event.target.files;
    reader.readAsDataURL(file[0]);
  }

  uploadImagem() {
    if (this.registerForm.get('imageFile').value !== "") {
      this.eventService.postUpload(this.file, this.fileNameToUpdate)
        .subscribe(
          () => {
            this.currentDate = new Date().getMilliseconds().toString();
            this.imageFile = `resources/images/${this.event.imageFile}?_ts=${this.currentDate}`;
          }
        );
    }
  }

  saveEvent() {
    this.event = Object.assign({ id: this.event.id }, this.registerForm.value);
    this.event.imageFile = this.fileNameToUpdate;

    this.uploadImagem();

    this.eventService.putEvent(this.event).subscribe(
      () => {
        this.toastr.success('Evento atualizado com sucesso.');
      }, error => {
        this.toastr.error(`Erro ao atualizar evento: ${error.message}`);
      }
    );
  }
}

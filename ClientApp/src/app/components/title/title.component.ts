// Generated through command line
// PM> cd .\ClientApp\src\app\components
// PM> ng generate component title

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {
  @Input() title: string;

  constructor() { }

  ngOnInit(): void {
  }
}

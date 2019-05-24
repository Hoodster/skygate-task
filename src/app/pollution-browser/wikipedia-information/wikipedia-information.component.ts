import { Component, OnInit, Input } from '@angular/core';
import { WikipediaObject } from '../../entities/wikipedia-object';

@Component({
  selector: 'plt-wikipedia-information',
  templateUrl: './wikipedia-information.component.html',
  styleUrls: ['./wikipedia-information.component.sass']
})
export class WikipediaInformationComponent implements OnInit {
  @Input() wikiInformation: WikipediaObject;
  constructor() { }

  ngOnInit() {
  }

}

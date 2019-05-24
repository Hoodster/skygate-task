import { Component, OnInit, Input } from '@angular/core';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { WikipediaObject } from '../../entities/wikipedia-object';

@Component({
  selector: 'plt-polluted-city-display',
  templateUrl: './polluted-city-display.component.html',
  styleUrls: ['./polluted-city-display.component.scss']
})
export class PollutedCityDisplayComponent implements OnInit {
  @Input() wikiInformation: WikipediaObject;
  caretIcon;
  showBody: boolean;
  

  constructor() { }

  ngOnInit() {
    this.caretIcon = faCaretDown;

    this.showBody = false;
  }

  toggleBody() {
    this.showBody = !this.showBody;
  }
}

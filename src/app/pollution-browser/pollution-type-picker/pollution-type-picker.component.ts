import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { OpenaqService } from '../../services/openaq.service';
import { PollutionParameter } from '../../entities/pollution-parameter';

@Component({
  selector: 'plt-pollution-type-picker',
  templateUrl: './pollution-type-picker.component.html',
  styleUrls: ['./pollution-type-picker.component.scss']
})
export class PollutionTypePickerComponent implements OnInit {
  options: PollutionParameter[];
  @Output() activeParticle;
  private _activeParticle;
  constructor(private openaq: OpenaqService) {
    this.activeParticle = new EventEmitter<string>();
   }

  ngOnInit() {
    this.options = [];
    this.openaq.getParameters().then((pollutionParameters: PollutionParameter[]) => this.options = pollutionParameters)
  }

  setActive(activeParticle: string) {
    this.activeParticle.emit(activeParticle);
    this._activeParticle = activeParticle;
  }

  checkIfActive(particle: string) {
    return particle === this._activeParticle;
  }
}

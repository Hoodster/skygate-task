import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParametrizationService {
  countryRange: string[];

  constructor() {
    this.countryRange = [
      "Poland",
      "Germany",
      "Spain",
      "France"
    ]
   }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CountryService } from '../services/country.service';
import { Country } from '../../entities/selected-country';
import { OpenaqService } from '../../services/openaq.service';
import { WikipediaService } from '../../services/wikipedia.service';
import { WikipediaObject } from '../../entities/wikipedia-object';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'plt-country-display',
  templateUrl: './country-display.component.html',
  styleUrls: ['./country-display.component.scss']
})
export class CountryDisplayComponent implements OnInit, OnDestroy {
  citiesToDisplay: WikipediaObject[];
  activeParticleId: string;
  activeCountry: Country;
  showError: boolean;
  showPollutionPicker: boolean;

  constructor(private countryService: CountryService, private localStorage: LocalStorageService) { }
  ngOnInit() {
    this.showPollutionPicker = false;    
    this.countryService.selectedCountry.subscribe((country:Country) =>{
      if (country) this.showPollutionPicker = true;
      this.activeCountry = country
    })

    const localStorageCities = this.localStorage.getLastCitiesObjects()
    localStorageCities ? this.citiesToDisplay = localStorageCities : this.citiesToDisplay = [];
  }

  setActiveParticle(particle: string) {
    this.activeParticleId = particle;

    this._showCities();
  }

  private _showCities() {
    this.countryService.getMostPollutedCities(this.activeCountry, this.activeParticleId)
    .then((cities: WikipediaObject[]) => {
      this.saveCitiesToDisplay(cities);
      this.citiesToDisplay = cities;
      this.showError = false;
    })
    .catch((error: string) =>{
      this.localStorage.saveLastCitiesObjects([]);
      this.citiesToDisplay = [];
      this.showError = true;
    })
  }

  saveCitiesToDisplay(citiesToSave: WikipediaObject[]) {
    this.localStorage.saveLastCitiesObjects(citiesToSave);
  }

  ngOnDestroy() {
    this.countryService.selectedCountry.unsubscribe();
  }
}

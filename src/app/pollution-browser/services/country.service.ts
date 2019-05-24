import { Injectable } from '@angular/core';
import { ParametrizationService } from '../../services/parametrization.service';
import { Observable, Subject } from 'rxjs';
import { Country } from '../../entities/selected-country';
import { OpenaqService } from '../../services/openaq.service';
import { OpenaqFilteringService } from '../../services/openaq-filtering.service';
import { CityMeasurement } from '../../entities/city-measurement';
import { WikipediaObject } from '../../entities/wikipedia-object';
import { WikipediaService } from '../../services/wikipedia.service';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  selectedCountry: Subject<Country>;
  dropdownCountries: string[];
  _countries: Country[];

  constructor(
    private paramService: ParametrizationService,
    private openaq: OpenaqService,
    private openaqFiltering: OpenaqFilteringService,
    private wikipediaService: WikipediaService
  ) {
    this.selectedCountry = new Subject<Country>();
    this.dropdownCountries = this.paramService.countryRange;
  }

  setSelectedCountry(nextCountry: string) {
    this.openaq.getCountries(this.dropdownCountries).then((countries: Country[]) =>{
      this._countries = countries;

      const countrySelected = countries.find((country:Country) => country.countryName.toLowerCase() === nextCountry.toLowerCase());

      if(!countrySelected) throw new Error("Now such country available");
  
      this.selectedCountry.next(countrySelected);
    });
  }

  getMostPollutedCities(selectedCountry: Country, activeParticleId: string): Promise<WikipediaObject[]> {
    return this.openaq.getLatestsMeasurementsForFiltering(selectedCountry.isoCode, activeParticleId).then(cities => {
      const filteredCities:CityMeasurement[] = this.openaqFiltering.getMostPollutedCities(cities);
      
      const citiesNames = [];
      const a = filteredCities.forEach(city => citiesNames.push(city.city))

      return this.wikipediaService.getMostPollutedCitiesInformation(citiesNames);
    });
  }
}

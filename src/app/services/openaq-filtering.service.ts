import { Injectable } from '@angular/core';
import { OpenaqService } from './openaq.service';
import { CityMeasurement } from '../entities/city-measurement';

@Injectable({
  providedIn: 'root'
})
export class OpenaqFilteringService {

  constructor(private openaq: OpenaqService) { }

  getMostPollutedCities(citiesToFilter: CityMeasurement[], numberOfCities: number = 10): CityMeasurement[] {
    const filteredCities = citiesToFilter.sort((left: CityMeasurement, right :CityMeasurement) => {
      return right.measurementAverage - left.measurementAverage;
    })

    if(filteredCities.length < 1) throw new Error('No Cities Found');
    return filteredCities.slice(0,numberOfCities);
  }
}

import { Injectable } from '@angular/core';
import { CountryDTO } from '../entities/dtos/country-dto';
import { Country } from '../entities/selected-country';
import { PollutionParameterDTO } from '../entities/dtos/pollution-parameter-dto';
import { PollutionParameter } from '../entities/pollution-parameter';
import { LatestMeasurementDTO } from '../entities/dtos/latest-dto';
import { LatestMeasurement } from '../entities/latestMeasurement';
import { MeasurementDTO } from '../entities/dtos/measurement-dto';
import { Measurement } from '../entities/dtos/measurement';
import { CityMeasurement } from '../entities/city-measurement';

@Injectable({
  providedIn: 'root'
})
export class OpenaqMappingService {

  constructor() { }

  mapAirParameters(parameters: PollutionParameterDTO[]): PollutionParameter[] {
    if (parameters.length < 1 || !parameters) throw new Error('no parameters found');

    const mappedParameters = parameters.map((parameter: PollutionParameterDTO) => {
      return new PollutionParameter(parameter.id, parameter.name, parameter.description, parameter.preferredUnit);
    })

    return mappedParameters;
  }

  mapCountries(countries: CountryDTO[]): Country[] {
    const mappedCountries = countries.map((country: CountryDTO) => new Country(country.name, country.code));

    return mappedCountries;
  }

  mapForFilter(latests: LatestMeasurement[]): CityMeasurement[] {
    const LatestMeasurementsToFiltering: CityMeasurement[] = [];

    latests.forEach((mappedLatest: LatestMeasurement) => {
      const cityObject = LatestMeasurementsToFiltering.find((fil: CityMeasurement) => fil.city.toLowerCase() === mappedLatest.city.toLowerCase());
      if (cityObject) {
        const previousMeasurementTotal = cityObject.measurementAverage * cityObject.numberOfMeasurements;
        let measurementAverage = mappedLatest.measurements.reduce((prev, current) => prev += parseFloat(current.measurementValue), previousMeasurementTotal);
        measurementAverage /= (mappedLatest.measurements.length + cityObject.numberOfMeasurements);
      } else {
        let measurementAverage = mappedLatest.measurements.reduce((prev, current) => prev += parseFloat(current.measurementValue), 0);
        measurementAverage /= mappedLatest.measurements.length;

        LatestMeasurementsToFiltering.push(new CityMeasurement(mappedLatest.city, measurementAverage, mappedLatest.measurements.length))
      }
    })

    return LatestMeasurementsToFiltering;
  }

  mapLatests(latest: LatestMeasurementDTO[]): LatestMeasurement[] {
    const mappedLatests = latest.map((latestMeasurement: LatestMeasurementDTO) => {
      const mappedMeasurements = this.mapMeasurements(latestMeasurement.measurements);
      const mappedLatest = new LatestMeasurement(
        latestMeasurement.location,
        latestMeasurement.city,
        latestMeasurement.country,
        mappedMeasurements
      )
      return mappedLatest;
    })
    
    return mappedLatests;
  }

  mapMeasurements(measurements: MeasurementDTO[]): Measurement[] {
    const mappedMeasurements = measurements.map((measurement: MeasurementDTO) => {
      const mappedMeasurement = new Measurement(
        measurement.parameter,
        measurement.value,
        measurement.lastUpdated,
        measurement.unit,
        measurement.sourceName
      )
      return mappedMeasurement;
    })

    return mappedMeasurements;
  }
}

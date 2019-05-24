import { Injectable } from '@angular/core';
import { PollutionParameter } from '../entities/pollution-parameter';
import { HttpClient } from '@angular/common/http';
import { PollutionParameterDTO } from '../entities/dtos/pollution-parameter-dto';
import { Country } from '../entities/selected-country';
import { Observable } from 'rxjs';
import { CountryDTO } from '../entities/dtos/country-dto';
import { OpenaqMappingService } from './openaq-mapping.service';
import { LatestMeasurement } from '../entities/latestMeasurement';
import { LatestMeasurementDTO } from '../entities/dtos/latest-dto';
import { RequestParameter } from '../entities/request-parameter';
import { CityMeasurement } from '../entities/city-measurement';

@Injectable({
  providedIn: 'root'
})
export class OpenaqService {
  private _baseURL: string;

  constructor(private http: HttpClient, private mappingService: OpenaqMappingService) {
    this._baseURL = 'https://api.openaq.org/v1';
   }

  getParameters(): Promise<PollutionParameter[]> {
    return new Promise((resolve, reject) => {
      this._sendGetRequest('parameters').subscribe((parameters: {results: PollutionParameterDTO[]}) => {
        const mappedParameters: PollutionParameter[] = this.mappingService.mapAirParameters(parameters.results);

        mappedParameters ? resolve(mappedParameters) : reject("couldn't receive any parameters");
      })
    })
  }

  getCountries(countriesRange: string[]): Promise<Country[]> { 
    return new Promise((resolve, reject) => {
      this._sendGetRequest('countries').subscribe((countries: {results: CountryDTO[]}) => {
        const selectedCountries = this._selectInRangeCountries(countries.results, countriesRange);

        resolve(selectedCountries)
      })
    })
  }

  getLatestsMeasurements(country:string, parameter?: string): Promise<LatestMeasurement[]> {
    return new Promise((resolve, reject) => {
      const parameters: RequestParameter[] = [
        new RequestParameter('country', country),
        new RequestParameter('limit', 10000)
      ]
      
      if (parameter) parameters.push(new RequestParameter('parameter', parameter));
      //TODO rethink the structure of get request and parameters
      
      this._sendGetRequest('latest', parameters).subscribe((latests: {results: LatestMeasurementDTO[]}) => {
        const selectedMeasurements = this.mappingService.mapLatests(latests.results);
        
        selectedMeasurements ? resolve(selectedMeasurements) : reject("couldn't reach any measurements");
      })
    })
  }

  getLatestsMeasurementsForFiltering(country:string, parameter: string): Promise<CityMeasurement[]> {
    return new Promise((resolve, reject) => {
      this.getLatestsMeasurements(country, parameter).then((latestMeasurements: LatestMeasurement[]) => {
        const mappedForFiltering = this.mappingService.mapForFilter(latestMeasurements);

        mappedForFiltering.length > 1 ? resolve(mappedForFiltering) : reject("couldn't reach any measurements");
      })
    })
  }

  private _sendGetRequest(apiRequestName: string, parameters?: RequestParameter[]): Observable<any | {parameters:any}> {
    let url = `${this._baseURL}/${apiRequestName}`;

    if(parameters) {
      url += "?"

      parameters.forEach((parameter: RequestParameter) => {
        url += `${parameter.parameterName}=${parameter.parameterValue}&`
      })
    }
    return this.http.get(url);
  }

  private _selectInRangeCountries(countries: CountryDTO[], countriesRange: string[]): Country[] {
    if (countries.length < 1 || !countries) throw new Error("couldn't find any cities");

    const mappedCountries = this.mappingService.mapCountries(countries);
    const inRangeCountries = mappedCountries.filter((country: Country) => {
      return countriesRange.some((countryName: string) => country.countryName.toLowerCase() === countryName.toLowerCase())
    }) 

    return inRangeCountries;
  }
}

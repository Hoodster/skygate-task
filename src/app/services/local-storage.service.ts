import { Injectable } from '@angular/core';
import { WikipediaObject } from '../entities/wikipedia-object';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {

   }

   saveLastInputValue(inputValue: string) {
     localStorage.setItem('pollution-tracker-input', inputValue);
   }

   getLastInputValue(): string {
    return localStorage.getItem('pollution-tracker-input');
   }

   saveLastCitiesObjects(lastCitiesRequest: WikipediaObject[]) {
     const parsedCitiesObjects = lastCitiesRequest.map((city: WikipediaObject) =>{
       return {...city}
     });

     localStorage.setItem('pollution-tracker-cities', JSON.stringify(parsedCitiesObjects));
   }

   getLastCitiesObjects(): WikipediaObject[] {
     const citiesArray = JSON.parse(localStorage.getItem('pollution-tracker-cities'));

     if (!citiesArray) return;
     
     citiesArray.map(city => {
       return new WikipediaObject(city.title, city.description, city.imageSource)
     });

     return citiesArray;
   }
}

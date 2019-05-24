import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorsService {

  constructor() { }

  countryRangeValidator(allowedCountries: string[]): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const isInRange = (allowedCountries.some((country: string) => country === control.value));

      return isInRange ? null : {'error': "isn't in range"};
    }
  }
}

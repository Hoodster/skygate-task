import { Component, OnInit } from '@angular/core';
import { CountryService } from '../services/country.service';
import { FormControl } from '@angular/forms';
import { CustomValidatorsService } from '../../services/custom-validators.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'plt-country-input',
  templateUrl: './country-input.component.html',
  styleUrls: ['./country-input.component.scss']
})
export class CountryInputComponent implements OnInit {
  dropdownCountries: string[];
  showDropdown: boolean;
  countryToShow: FormControl;

  constructor(
    private countryService: CountryService,
    private customValidators: CustomValidatorsService,
    private localStorage: LocalStorageService
  ) { }

  ngOnInit() {
    this.dropdownCountries = this.countryService.dropdownCountries;

    this.showDropdown = false;

    this.countryToShow = new FormControl(null, [this.customValidators.countryRangeValidator(this.dropdownCountries)]);
        
    this.getInputValueFromLocalStorage();
  }

  dropdownStateChange() {
    this.showDropdown = !this.showDropdown;
  }

  closeDropdown() {
    this.showDropdown = false;
  }

  setInputValue(country: string) {
    this.countryToShow.setValue(country);
    this.saveInputValue(country);
  }

  getInputValue(): string {
    return this.countryToShow.value;
  }

  setActiveCountry() {
    this.countryService.setSelectedCountry(this.getInputValue());
  }

  saveInputValue(inputValue: string) {
    this.localStorage.saveLastInputValue(inputValue);
  }

  getInputValueFromLocalStorage() {
    const inputValue = this.localStorage.getLastInputValue();
    inputValue ? this.countryToShow.setValue(inputValue) : this.countryToShow.setValue('');
    
    if(this.countryToShow.valid) {
      console.log(this.countryToShow.value);
      this.setActiveCountry();
    }
  }
}

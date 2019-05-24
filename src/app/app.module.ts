import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AlertModule } from 'ngx-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from  '@angular/common/http';

import { LayoutComponent } from './layout/layout.component';
import { CountryInputComponent } from './pollution-browser/country-input/country-input.component';
import { CountryDisplayComponent } from './pollution-browser/country-display/country-display.component';
import { PollutedCityDisplayComponent } from './pollution-browser/polluted-city-display/polluted-city-display.component';
import { DropdownFilterPipe } from './pipes/dropdown-filter.pipe';
import { PreventToggleDirective } from './directives/prevent-toggle.directive';
import { PollutionTypePickerComponent } from './pollution-browser/pollution-type-picker/pollution-type-picker.component';
import { WikipediaInformationComponent } from './pollution-browser/wikipedia-information/wikipedia-information.component';


@NgModule({
  declarations: [
    LayoutComponent,
    CountryInputComponent,
    CountryDisplayComponent,
    PollutedCityDisplayComponent,
    DropdownFilterPipe,
    PreventToggleDirective,
    PollutionTypePickerComponent,
    WikipediaInformationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [LayoutComponent]
})
export class AppModule { }

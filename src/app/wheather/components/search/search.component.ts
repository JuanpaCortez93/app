import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormlyFieldConfig} from '@ngx-formly/core';
import { WheatherService } from '../../services/wheather.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  //Dependency Injection Variables
  private readonly _wheatherService:WheatherService;
  private readonly _toastr: ToastrService; 

  /**
   * Constructs a new instance of SearchComponent.
   * @param wheatherService - Service for fetching weather data.
   * @param toastr - Service for displaying toast messages.
   */
  constructor(wheatherService:WheatherService, toastr: ToastrService){
    this._wheatherService = wheatherService;
    this._toastr = toastr;
  }

  //Formly Set-Up
  form = new FormGroup({});
  model = { id: '0', cityName: '' };
  fields: FormlyFieldConfig[] = [
    {
      key: 'cityName',
      type: 'input',
      props: {
        label: '',
        placeholder: 'Write the city name here',
        required: true,
      }
    }
  ];

  /**
   * Handles form submission (needs the model {id, cityName})
   */
  onSubmit() {
    if(this.model.cityName.length === 0) this._toastr.warning('Please write a city', 'Not allowed');
    else this._wheatherService.GetFavCitiesWeatherResponseFromApi(this.model);
  }

  /**
   * Getter for retrieving weather favorites data.
   * @returns wheatherFavsData array.
   */
  get wheatherFavsData(){
    return this._wheatherService.wheatherFavsData;
  }


}

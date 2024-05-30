import { Component, Input, OnInit } from '@angular/core';
import { IWeatherFavs } from '../../interfaces/IWeatherFavs.interface';
import { WheatherService } from '../../wheather.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  @Input() wheatherFavs : IWeatherFavs[];

  private readonly _wheatherService : WheatherService;

  constructor (wheatherService : WheatherService) {
    this._wheatherService = wheatherService;
  }

  

  public DeleteFav(id:string) {
    return this._wheatherService.DeleteFavoriteCityFromApi(id);
  }
} 

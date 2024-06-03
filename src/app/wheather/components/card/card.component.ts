import { Component, Input, OnInit } from '@angular/core';
import { IWeatherFavs } from '../../services/interfaces/IWeatherFavs.interface';
import { WheatherService } from '../../services/wheather.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  //Parent to child inputs
  //wheatherFavs array
  @Input() wheatherFavs : IWeatherFavs[];
  /**
   * Action: 1 - My Favorites component frontend
   * Action: 2 - Add a new city component frontend
   */

  @Input() action : number;

  // Dependency injection variables
  private readonly _wheatherService : WheatherService;

  // Variables
  // Show Week weather forecast
  showForecast : { [key: string]: boolean } = {};
  forecastIcon : string = "bi bi-calendar4-week";
  closeForecastIcon : string = "bi bi-x-circle-fill";


  /**
   * Constructs a new instance of CardComponent.
   * @param wheatherService - Service for fetching weather data.
   */
  constructor (wheatherService : WheatherService) {
    this._wheatherService = wheatherService;
  }

  // Variables
  // Show Week weather forecast
  toggleshowForecast(id: string) {
    this.showForecast[id] = !this.showForecast[id];
  }

  /**
   * Deletes a favorite city.
   * @param id - Id of the city to delete.
  */
  public DeleteFav(id:string) {
    return this._wheatherService.DeleteFavoriteCityFromDatabase(id);
  }

  /**
   * Deletes a suggested city.
   * @param id - Id of the city to delete.
  */
  public DeleteSuggest(id:string) {
    return this._wheatherService.DeleteSuggest(id);
  }

  /**
   * Adds a city to favorites.
   * @param name - Name of the city to add.
  */
  public AddFav(name:string){
    this._wheatherService.AddFavoriteToDatabase(name);
  }
} 

import { Component, OnInit } from '@angular/core';
import { WheatherService } from '../../wheather.service';
import { IFavCitiesApp } from '../../interfaces/IFavCitiesApp.interface';

/**
  * Component for displaying favorite cities and their weather information.
*/

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent implements OnInit{

    //Dependency injection variables
    private readonly _weatherService : WheatherService;

    /**
     * Constructs a new instance of FavoritesComponent.
     * @param weatherService - Service for fetching weather data.
    */
    constructor(weatherService : WheatherService) {
      this._weatherService = weatherService;
    }

    /**
     * Initializes the component and retrieves favorite cities from the API using GetFavoritesCitiesFromApi.
     * Create the wheatherFavsData wheatherFavsData for show the data in the component  
    */
    ngOnInit(): void {
      this._weatherService.GetFavoritesCitiesFromApi();
    }

    /**
     * Getter for retrieving weather favorites data.
     * @returns wheatherFavsData array.
    */
    get wheatherFavsData(){
      return this._weatherService.wheatherFavsData;
    }

  }

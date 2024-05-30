import { Component, OnInit } from '@angular/core';
import { WheatherService } from '../../wheather.service';
import { IFavCitiesApp } from '../../interfaces/IFavCitiesApp.interface';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent implements OnInit{

    private readonly _weatherService : WheatherService;

    constructor(weatherService : WheatherService) {
      this._weatherService = weatherService;
    }

    ngOnInit(): void {
      this._weatherService.GetFavoritesCitiesFromApi();
    }

    get wheatherFavsData(){
      return this._weatherService.wheatherFavsData;
    }

  }

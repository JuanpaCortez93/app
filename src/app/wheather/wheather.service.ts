import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { IOpenWeatherApiResponse } from './interfaces/IOpenWeatherApiResponse.interface';
import { IWeatherFavs } from './interfaces/IWeatherFavs.interface';
import { IFavCitiesApi } from './interfaces/IFavCitiesApi.interface';
import { IFavCitiesApp } from './interfaces/IFavCitiesApp.interface';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WheatherService {


  private readonly _apiUrl : string = environment.weatherApiUrl;
  private readonly _apiKey : string = environment.weatherapiKey;
  private readonly _apiImgUrl : string = environment.weatherImgUrl;

  private readonly _favCitiesUrl : string = environment.favCitiesApiUrl;

  private _httpClient : HttpClient; 
  public wheatherFavsData : IWeatherFavs[] = [];

  constructor(httpClient : HttpClient) {
    this._httpClient = httpClient;
  }
 
  public GetWeatherResponseFromApi(favCities:IFavCitiesApp) {
    this._httpClient.get<IOpenWeatherApiResponse>(`${this._apiUrl}?q=${favCities.cityName}&appid=${this._apiKey}`).subscribe(res => {
      
      if(res.cod === 200){
        const country : string = res.sys.country;
        const temp : number = Number(Math.round(res.main.temp - 273.15));
        const minTemp : number = Number(Math.round(res.main.temp_min - 273.15));
        const maxTemp : number = Number(Math.round(res.main.temp_max - 273.15));
        const humidity : number = Number((res.main.humidity));
        const weatherCondition : string = res.weather['0'].main;
        const icon : string = this._apiImgUrl + res.weather['0'].icon + ".png";
        const windSpeed : number = Math.round(res.wind.speed * 18/5);

        this.wheatherFavsData.push({id: favCities.id, country, city: favCities.cityName, temp, minTemp, maxTemp, humidity, windSpeed, weatherCondition, icon});
      }

    });
  }

  public GetFavoritesCitiesFromApi() {
    this._httpClient.get<IFavCitiesApi[]>(`${this._favCitiesUrl}`).subscribe(res => {
      res.map(city => {
        this.GetWeatherResponseFromApi({id:city._id, cityName: city.city});
      });
    });
  }

  public DeleteFavoriteCityFromApi(id:string) {
    this._httpClient.delete<IFavCitiesApi>(`${this._favCitiesUrl}${id}`).subscribe(
      res => {
      this.wheatherFavsData = this.wheatherFavsData.filter(item => item.id != id);
    }
  );
  }

}

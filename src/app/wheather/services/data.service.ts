import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOpenWeatherApiResponseForecast } from './interfaces/IOpenWeatherApiResponseForecast,interface';
import { environment } from '../../../environments/environment.development';
import { IOpenWeatherApiResponse } from './interfaces/IOpenWeatherApiResponse.interface';
import { IFavCitiesApi } from './interfaces/IFavCitiesApi.interface';
import { IDataService } from './interfaces/IDataService.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService implements IDataService {

  // Get environment variables
  private readonly _apiUrl : string = environment.weatherApiUrl;
  private readonly _apiKey : string = environment.weatherapiKey;
  private readonly _favCitiesUrl : string = environment.favCitiesApiUrl;

  //Get Dependency Injection Variables
  private _httpClient : HttpClient; 

  /**
   * @constructor
   * @param {HttpClient} httpClient - HttpClient service
  */
  constructor(httpClient : HttpClient) {
    this._httpClient = httpClient;
  }
  
  /**
   * Retrieves the favorite cities from the database.
   * @returns An observable of the favorite cities API response.
   */
  public GetFavoritesFromDatabase() : Observable<IFavCitiesApi[]>{
    const completeUrl = this._favCitiesUrl;
    return this._httpClient.get<IFavCitiesApi[]>(completeUrl);
  }

  /**
   * Retrieves weather data for a specific city from the database.
   * @param city The name of the city.
   * @returns An observable of the weather API response for the specified city.
   */
  public GetCityFromDatabase(city:string) : Observable<IOpenWeatherApiResponse> {
    const completeUrl = this._favCitiesUrl + city.toLowerCase();
    return this._httpClient.get<IOpenWeatherApiResponse>(completeUrl);
  }

  /**
   * Adds a favorite city to the database.
   * @param city The name of the city to add.
   * @returns An observable of the HTTP POST request response.
   */
  public AddFavoriteToDatabase(city:string){
    const completeUrl = this._favCitiesUrl;
    return this._httpClient.post(completeUrl, {city});
  }

  /**
   * Retrieves current weather data for a specific city from the OpenWeatherMap API.
   * @param city The name of the city.
   * @returns An observable of the weather API response for the specified city.
   */
  public GetCityWeatherFromApi(city:string) : Observable<IOpenWeatherApiResponse>{
    const completeUrl = `${this._apiUrl}weather?q=${city}&appid=${this._apiKey}`;
    return this._httpClient.get<IOpenWeatherApiResponse>(completeUrl);
  }

  /**
   * Retrieves forecast weather data for a specific city from the OpenWeatherMap API.
   * @param city The name of the city.
   * @returns An observable of the forecast API response for the specified city.
   */
  public GetForecastFromApi(city:string) : Observable<IOpenWeatherApiResponseForecast> {
    const completeUrl = `${this._apiUrl}forecast?q=${city}&appid=${this._apiKey}`;
    return this._httpClient.get<IOpenWeatherApiResponseForecast>(completeUrl);
  }

  /**
   * Deletes a city from the database.
   * @param id The ID of the city to delete.
   * @returns An observable of the HTTP DELETE request response.
   */
  public DeleteCityFromDatabase(id:string) : Observable<IFavCitiesApi> {
    const completeUrl = `${this._favCitiesUrl}${id}`;
    return this._httpClient.delete<IFavCitiesApi>(completeUrl);
  }

  
}

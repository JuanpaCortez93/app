import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IOpenWeatherApiResponse } from './interfaces/IOpenWeatherApiResponse.interface';
import { IWeatherFavs } from './interfaces/IWeatherFavs.interface';
import { IFavCitiesApi } from './interfaces/IFavCitiesApi.interface';
import { IFavCitiesApp } from './interfaces/IFavCitiesApp.interface';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class WheatherService {

  // Get environment variables
  private readonly _apiUrl : string = environment.weatherApiUrl;
  private readonly _apiKey : string = environment.weatherapiKey;
  private readonly _apiImgUrl : string = environment.weatherImgUrl;
  private readonly _favCitiesUrl : string = environment.favCitiesApiUrl;
  
  // Define dependency injection variables
  private _httpClient : HttpClient; 
  private readonly _toastr: ToastrService; 

  // Define wheatherFavsData for data comming from DB (Backend)
  public wheatherFavsData : IWeatherFavs[] = [];

  /**
   * @constructor
   * @param {HttpClient} httpClient - HttpClient service
   * @param {ToastrService} toastr - Toastr Ads service
   */
  constructor(httpClient : HttpClient, toastr: ToastrService) {
    this._httpClient = httpClient;
    this._toastr = toastr;
  }
 
  /**
   * GetFavCitiesWeatherResponseFromApi: Retrieves weather data for favorite cities from the API
   * @param {IFavCitiesApp} favCities : Object containing the id and name of the favorite city (id and city name data comes from DB)
   * @private: as result creates a wheatherFavsData item with the weather data of the city. Otherwise a message will be display indicating the error 
  */
  public GetFavCitiesWeatherResponseFromApi(favCities:IFavCitiesApp) {

    const completeApiUrl = `${this._apiUrl}?q=${favCities.cityName}&appid=${this._apiKey}`;
    this._httpClient.get<IOpenWeatherApiResponse>(completeApiUrl).subscribe(res => {
      
      //Create the variables to show at the frontend
      const country : string = res.sys.country;
      const temp : number = Number(Math.round(res.main.temp - 273.15));
      const minTemp : number = Number(Math.round(res.main.temp_min - 273.15));
      const maxTemp : number = Number(Math.round(res.main.temp_max - 273.15));
      const humidity : number = Number((res.main.humidity));
      const weatherCondition : string = res.weather['0'].main;
      const icon : string = this._apiImgUrl + res.weather['0'].icon + ".png";
      const windSpeed : number = Math.round(res.wind.speed * 18/5);

      //Check if the frontend is in the Search component (favCities.id===0) or the Favorites component(favCities.id!===0)
      //In case is in the search component, it needs to be reviewed. Otherwise will be added to the wheatherFavsData
      if(favCities.id === '0'){
        // If the city is not in the Search Component List, add it, otherwise show an advertisement
        const tempWeatherData = this.wheatherFavsData.filter(item => item.id === favCities.cityName);
        if(tempWeatherData.length === 0){
          // If the city is not in the list at the Search Component List, add it
          this._httpClient.get<IOpenWeatherApiResponse>(this._favCitiesUrl + favCities.cityName.toLowerCase()).subscribe(response => {
            if(response === null) this.wheatherFavsData.push({id: favCities.cityName, country, city: favCities.cityName, temp, minTemp, maxTemp, humidity, windSpeed, weatherCondition, icon});
            else this._toastr.warning('This city is in your favorites', 'Not allowed');
          });
        }else{          
          this._toastr.warning('This city is in your favorites', 'Not allowed');
        }
      }else{
        this.wheatherFavsData.push({id: favCities.id, country, city: favCities.cityName, temp, minTemp, maxTemp, humidity, windSpeed, weatherCondition, icon});
      }
    },
    error => {
      this._toastr.warning('The city does not exist', 'Not allowed')
    });
  }

  /**
   * GetFavoritesCitiesFromApi: Retrieves favorite cities from the API and fetches their weather data
   * @private: creates a wheatherFavsData array. 
  */
  public GetFavoritesCitiesFromApi() {
    this._httpClient.get<IFavCitiesApi[]>(`${this._favCitiesUrl}`).subscribe(res => {
      res.map(city => {
        this.GetFavCitiesWeatherResponseFromApi({id:city._id, cityName: city.city});
      });
    });
  }

  /**
   * Deletes a favorite city from the API
   * @param {string} id : Id of the favorite city to delete
   * @private: remove the element from wheatherFavsData array
   */
  public DeleteFavoriteCityFromApi(id:string) {
    this._httpClient.delete<IFavCitiesApi>(`${this._favCitiesUrl}${id}`).subscribe(
      res => {
      this.wheatherFavsData = this.wheatherFavsData.filter(item => item.id != id);
      this._toastr.success('City removed from your favorites', 'Successfull')
    }
  )
  }

  /**
   * Deletes a suggested city from the list of suggestions
   * @param {string} id : Id of the suggested city to delete
   * @private: 
  */
  public DeleteSuggest(id:string) {
    this.wheatherFavsData = this.wheatherFavsData.filter(item => item.id != id);
  }

  
  /**
   * Adds a suggested city to the favorites list via the API
   * @param {string} name : Name of the suggested city to add
   * @private: add the item to the database, add the item to the wheatherFavsData array and show a success message
  */
  public AddSuggest(name:string) {
    this._httpClient.post(`${this._favCitiesUrl}`, {city: name}).subscribe(res => {
      this.wheatherFavsData = this.wheatherFavsData.filter(item => item.id != name);
      this._toastr.success('The city was added at your favorites', 'Successful');
    });
  }

}

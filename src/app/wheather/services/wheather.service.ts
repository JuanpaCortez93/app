import { Injectable } from '@angular/core';
import { IWeatherFavs } from './interfaces/IWeatherFavs.interface';
import { IFavCitiesApp } from './interfaces/IFavCitiesApp.interface';
import { ToastrService } from 'ngx-toastr';
import { IOpenWeatherApiResponseForecast } from './interfaces/IOpenWeatherApiResponseForecast,interface';
import { IFavCitiesForecast } from './interfaces/IFavCitiesForecast.interface';
import { WeatherFavCities } from '../models/wheaterFavCities.model';
import { WeatherForecast } from '../models/weatherForecast.model';
import { WeatherForecastInfoList } from '../models/weatherForecastInfoList.model';
import { DataService } from './data.service';
import { IWeatherService } from './interfaces/IWeatherService.interface';

@Injectable({
  providedIn: 'root'
})
export class WheatherService implements IWeatherService {

  // Define dependency injection variables
  private readonly _toastr: ToastrService; 

  //Add Data Service
  private readonly _dataService : DataService;

  // Define wheatherFavsData for data comming from DB (Backend)
  public wheatherFavsData : IWeatherFavs[] = [];
  
  /**
   * @constructor
   * @param {ToastrService} toastr - Toastr Ads service
   * @param {DataService} dataService - Data APIs service
   */
  constructor(toastr: ToastrService, dataService : DataService) {
    this._toastr = toastr;
    this._dataService = dataService;
  }
 
  /**
   * GetFavCitiesWeatherResponseFromApi: Retrieves weather data for favorite cities from the API
   * @param {IFavCitiesApp} favCities : Object containing the id and name of the favorite city (id and city name data comes from DB)
   * @private: as result creates a wheatherFavsData item with the weather data of the city. Otherwise a message will be display indicating the error 
  */
  public GetFavCitiesWeatherResponseFromApi(favCities:IFavCitiesApp) {

    const getCityWeatherFromApi = this._dataService.GetCityWeatherFromApi(favCities.cityName);
    getCityWeatherFromApi.subscribe(res => {
      
      //Get interesting values
      const country : string = res.sys.country;
      const temp : number = res.main.temp;
      const minTemp : number = res.main.temp_min;
      const maxTemp : number = res.main.temp_max;
      const feelsLikeTemp : number = res.main.feels_like;
      const humidity : number = res.main.humidity;
      const weatherCondition : string = res.weather['0'].main;
      const icon : string = res.weather['0'].icon;
      const windSpeed : number = res.wind.speed;

      //Check if the frontend is in the Search component (favCities.id===0) or the Favorites component(favCities.id!===0)
      //In case is in the search component, it needs to be reviewed. Otherwise will be added to the wheatherFavsData
      if(favCities.id === '0'){
        const tempWeatherData = this.wheatherFavsData.filter(item => item.city === favCities.cityName);
        if(tempWeatherData.length === 0){
          const isTheCityInDb = this._dataService.GetCityFromDatabase(favCities.cityName);
          isTheCityInDb.subscribe(response => {
            if(response === null) {
              const forecastApi = this._dataService.GetForecastFromApi(favCities.cityName);
              forecastApi.subscribe(res => {  
                const weatherForecastData = this.CreateForecastApi(res);
                const weatherFavsObj : WeatherFavCities = new WeatherFavCities(favCities.id, country, favCities.cityName, weatherCondition, humidity, temp, minTemp, maxTemp, feelsLikeTemp, windSpeed, icon, weatherForecastData) ;
                this.wheatherFavsData.push(weatherFavsObj);
              });              
            }else this._toastr.warning('This city is in your favorites', 'Not allowed');
          });
        }else{          
          this._toastr.warning('This city is now in the list', 'Not allowed');
        }
      }else{
        const forecastApi = this._dataService.GetForecastFromApi(favCities.cityName);
        forecastApi.subscribe(res => {  
          const weatherForecastData = this.CreateForecastApi(res);
          const weatherFavsObj : WeatherFavCities = new WeatherFavCities(favCities.id, country, favCities.cityName, weatherCondition, humidity, temp, minTemp, maxTemp, feelsLikeTemp, windSpeed, icon, weatherForecastData) ;
          this.wheatherFavsData.push(weatherFavsObj);
        });
      }
    },
    error => {
      //In error case (the city does not exist)
      this._toastr.warning('The city does not exist', 'Not allowed')
    });
  }


  /**
   * Creates a forecast API response.
   * @param res The response from the OpenWeather API.
   * @returns An array of forecast data for favorite cities.
  */
  public CreateForecastApi(res : IOpenWeatherApiResponseForecast){
    let weatherForecastData : IFavCitiesForecast[] = [];

    const cityForecast = res.city.name;     
    const list = res.list;

    const uniqueData = list.filter((item, index, self) => {
      return index === self.findIndex((t) => (
        this.unixToNormalDate(t.dt.toString()) === this.unixToNormalDate(item.dt.toString())
      ));
    });

    const transformedData = uniqueData.map((item) => {
      const transformedObj = { ...item };
      transformedObj.dt = Number(this.unixToNormalDate(item.dt.toString()));
      return transformedObj;
    });

    transformedData.forEach(item => {
      let dayName : string;
      const dateObject = new Date(item.dt_txt);
      const today = new Date();

      const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wendesday', 'Thursday', 'Friday', 'Saturday'];
      dateObject.getDay() === today.getDay() ? dayName = 'Today' : dayName = daysOfWeek[dateObject.getDay()];;
      
      const temp:number = item.main.temp;
      const weatherCondition:string = item.weather['0'].main;
      const icon:string = item.weather['0'].icon;

      const forecastInfoList = new WeatherForecastInfoList(dayName, temp, weatherCondition, icon);
      const weatherForecastObj = new WeatherForecast(cityForecast,forecastInfoList);
      weatherForecastData.push(weatherForecastObj);
    });


    return weatherForecastData;
  }

  /**
   * Adds a suggested city to the favorites list via the API
   * @param {string} name : Name of the suggested city to add
   * @private: add the item to the database, add the item to the wheatherFavsData array and show a success message
  */
  public AddFavoriteToDatabase(name:string) {
    const addCity = this._dataService.AddFavoriteToDatabase(name);
    addCity.subscribe(res => {
      this.wheatherFavsData = this.wheatherFavsData.filter(item => item.city != name);
      this._toastr.success('The city was added at your favorites', 'Successful');
    });
  }

  /**
   * GetFavoritesCitiesFromApi: Retrieves favorite cities from the API and fetches their weather data
   * @private: creates a wheatherFavsData array. 
  */
    public GetFavoritesCitiesFromApi() {
      const getFavoritesFromDatabase = this._dataService.GetFavoritesFromDatabase();
      getFavoritesFromDatabase.subscribe(res => {
        res.map(city => {
          this.GetFavCitiesWeatherResponseFromApi({id:city._id, cityName: city.city});
        });
      });
    }
  
  /**
   * Deletes a favorite city from the Database
   * @param {string} id : Id of the favorite city to delete
   * @private: remove the element from wheatherFavsData array
   */
  public DeleteFavoriteCityFromDatabase(id:string) {
    const deleteCityFromDatabase = this._dataService.DeleteCityFromDatabase(id);
    deleteCityFromDatabase.subscribe(
      res => {
      this.wheatherFavsData = this.wheatherFavsData.filter(item => item.id != id);
      this._toastr.success('City removed from your favorites', 'Successfull')
    });
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
   * Converts a UNIX time to a normal date in string format.
   * @param unixTime UNIX time in string format.
   * @returns The normal date in string format (YYYY-MM-DD).
   */
  public unixToNormalDate(unixTime:string) {

    const date = new Date(Number(unixTime) * 1000);
    const normalDate = date.toISOString().slice(0, 10);
    return normalDate;
  }

}

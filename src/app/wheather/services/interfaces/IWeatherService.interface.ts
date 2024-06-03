import { Observable } from "rxjs";
import { IFavCitiesApp } from "./IFavCitiesApp.interface";
import { WeatherFavCities } from "../../models/wheaterFavCities.model";
import { IOpenWeatherApiResponseForecast } from "./IOpenWeatherApiResponseForecast,interface";
import { IFavCitiesForecast } from "./IFavCitiesForecast.interface";


export interface IWeatherService {
    GetFavCitiesWeatherResponseFromApi(favCities:IFavCitiesApp) : void;
    CreateForecastApi(res : IOpenWeatherApiResponseForecast) : void;
    AddFavoriteToDatabase(name:string) : void;
    GetFavoritesCitiesFromApi() : void;
    DeleteFavoriteCityFromDatabase(id:string) : void;
    DeleteSuggest(id:string) : void;
    unixToNormalDate(unixTime:string) : string;
}
import { environment } from "../../../environments/environment.development";
import { IFavCitiesForecast } from "../services/interfaces/IFavCitiesForecast.interface";
import { IWeatherFavs } from "../services/interfaces/IWeatherFavs.interface";

export class WeatherFavCities implements IWeatherFavs {

    private readonly _apiImgUrl : string = environment.weatherImgUrl;

    id: string;
    country: string;
    city: string;
    weatherCondition: string;
    humidity: number;
    temp: number;
    minTemp: number;
    maxTemp: number;
    feelsLikeTemp: number;
    windSpeed: number;
    icon: string;
    forecast: IFavCitiesForecast[];

    constructor(id:string, country:string, city:string, weatherCondition: string, humidity: number, temp: number, 
        minTemp: number, maxTemp: number, feelsLikeTemp:number, windSpeed:number, icon: string, forecast: IFavCitiesForecast[]){

        this.id = id;
        this.country = country;
        this.city = city;
        this.weatherCondition = weatherCondition;
        this.humidity = Number((humidity));
        this.temp = Number(Math.round(temp - 273.15));
        this.minTemp = Number(Math.round(minTemp - 273.15));
        this.maxTemp = Number(Math.round(maxTemp - 273.15));
        this.feelsLikeTemp = Number(Math.round(feelsLikeTemp - 273.15));
        this.windSpeed = Math.round(windSpeed * 18/5);
        this.icon = this._apiImgUrl + icon + ".png";
        this.forecast = forecast;
            
    }


}
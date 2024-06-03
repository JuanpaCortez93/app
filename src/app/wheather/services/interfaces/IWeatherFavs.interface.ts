import { IFavCitiesForecast } from "./IFavCitiesForecast.interface";
import { IOpenWeatherApiResponseForecast } from "./IOpenWeatherApiResponseForecast,interface";

/**
 * IFavCitiesApp represents the structure data which its used for the weather cards in the frontend
 */
export interface IWeatherFavs {
    id: string,
    country: string,
    city:string,
    weatherCondition:string,
    humidity:number,
    temp:number,
    minTemp : number,
    maxTemp : number,
    feelsLikeTemp: number,
    windSpeed : number,
    icon:string,
    forecast: IFavCitiesForecast[]
}
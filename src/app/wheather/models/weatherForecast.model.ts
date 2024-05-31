import { IFavCitiesForecast, IList } from "../interfaces/IFavCitiesForecast.interface";
import { WeatherForecastInfoList } from "./weatherForecastInfoList.model";

export class WeatherForecast implements IFavCitiesForecast {
    cityForecast: string;
    info: WeatherForecastInfoList;

    constructor(cityForecast:string, info:WeatherForecastInfoList){
        this.cityForecast = cityForecast;
        this.info = info;
    }

}
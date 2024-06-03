import { environment } from "../../../environments/environment.development";
import { IList } from "../services/interfaces/IFavCitiesForecast.interface";


export class WeatherForecastInfoList implements IList {

    private readonly _apiImgUrl : string = environment.weatherImgUrl;

    date: string;
    temp: number;
    weatherCondition: string;
    icon: string;

    constructor(date:string, temp:number, weatherCondition:string, icon:string){
        this.date = date;
        this.temp = Math.round(temp - 273.15);
        this.weatherCondition = weatherCondition;
        this.icon = this._apiImgUrl + icon + ".png";
    }
}
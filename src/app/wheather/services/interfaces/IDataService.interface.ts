import { Observable } from "rxjs";
import { IFavCitiesApi } from "./IFavCitiesApi.interface";


export interface IDataService {
    GetFavoritesFromDatabase() : any;
    GetCityFromDatabase(city:string) : any;
    AddFavoriteToDatabase(city:string) : any;
    GetCityWeatherFromApi(city:string) : any;
    GetForecastFromApi(city:string) : any;
    DeleteCityFromDatabase(id:string) : Observable<IFavCitiesApi>;
}
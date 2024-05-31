export interface IFavCitiesForecast {
    cityForecast : string;
    info : IList;
}

export interface IList {
    date: string;
    temp: number;
    weatherCondition: string;
    icon: string;
}
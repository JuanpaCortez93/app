/**
 * IFavCitiesApi represents the structure data which is comming from server (http://localhost:3000/api/favorite/)
 */
export interface IFavCitiesApi {
    _id:       string;
    city:      string;
    createdAt: Date;
    updatedAt: Date;
    __v:       number;
}

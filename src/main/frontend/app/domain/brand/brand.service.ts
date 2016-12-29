import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {Brand} from "./brand";


@Injectable()
export class BrandService {

    private brandsByActivityCodeUrl = 'rest/brands';

    constructor(private http:Http) {
    }

    public getBrandsByActivityCode(activityCode: String):Promise<Brand[]> {
        return this.http.get(this.brandsByActivityCodeUrl + `?activityCode=${activityCode}`)
            .toPromise()
            .then(response => response.json() as Brand[])
            .catch(this.handleError);
    }

    public getBrand(brandCode:String) {
        return this.http.get(this.brandsByActivityCodeUrl + `?brandCode=${brandCode}`)
            .toPromise()
            .then(response => response.json() as Brand)
            .catch(this.handleError);
    }

    private handleError(error:any):Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
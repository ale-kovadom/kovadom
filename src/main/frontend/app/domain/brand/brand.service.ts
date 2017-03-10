import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {Brand} from "./brand";
import {BrandShowcaseImage} from "./brand.showcaseImage";


@Injectable()
export class BrandService {

    private static BRANDS_URL = 'rest/brands';

    private static BRAND_PROMO_IMAGE_URL = BrandService.BRANDS_URL + "/images";

    constructor(private http:Http) {
    }

    public getBrandsByActivityCode(activityCode: String):Promise<Brand[]> {
        return this.http.get(BrandService.BRANDS_URL + `?activityCode=${activityCode}`)
            .toPromise()
            .then(response => response.json() as Brand[])
            .catch(this.handleError);
    }

    public getBrand(brandCode:String) {
        return this.http.get(BrandService.BRANDS_URL + `?brandCode=${brandCode}`)
            .toPromise()
            .then(response => response.json() as Brand)
            .catch(this.handleError);
    }

    public getBrandShowcaseImages(brandCode:String) {
        return this.http.get(BrandService.BRAND_PROMO_IMAGE_URL + `?brandCode=${brandCode}`)
            .toPromise()
            .then(response => response.json() as BrandShowcaseImage[])
            .catch(this.handleError);
    }

    private handleError(error:any):Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
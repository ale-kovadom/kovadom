import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {Contact} from "./contact";
import {Response} from "@angular/http/src";


@Injectable()
export class RegistrationService {

    private static URL = 'rest/registration/';

    private static COMPANY_URL = RegistrationService.URL + 'company';

    private static SALE_URL = RegistrationService.URL + 'sale';

    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {
    }

    public registerCompany(contact: Contact): Promise<Response> {
        return this.http
            .post(RegistrationService.COMPANY_URL, JSON.stringify(contact), {headers: this.headers})
            .toPromise();
    }

    public registerSale(contact: Contact): Promise<Response> {
        return this.http
            .post(RegistrationService.SALE_URL, JSON.stringify(contact), {headers: this.headers})
            .toPromise();
    }

}
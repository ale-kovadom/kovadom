import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {Contact} from "./contact";


@Injectable()
export class RegistrationService {

    private static URL = 'rest/registration/';

    private static COMPANY_URL = RegistrationService.URL + 'company';

    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {
    }

    public registerCompany(contact: Contact): Promise<void> {
        return this.http
            .post(RegistrationService.COMPANY_URL, JSON.stringify(contact), {headers: this.headers})
            .toPromise();
    }

}
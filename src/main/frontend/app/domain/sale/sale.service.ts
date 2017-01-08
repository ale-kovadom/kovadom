import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {Sale} from "./sale";


@Injectable()
export class SaleService {

    private saleUrl = 'rest/sale';

    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {
    }

    public create(sale: Sale): Promise<void> {
        return this.http
            .post(this.saleUrl, JSON.stringify(sale), {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
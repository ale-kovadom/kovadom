import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {Sale} from "./sale";
import {Response} from "@angular/http/src";


@Injectable()
export class SaleService {

    private saleUrl = 'rest/sale';

    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {
    }

    public create(sale: Sale): Promise<Response> {
        return this.http
            .post(this.saleUrl, JSON.stringify(sale), {headers: this.headers})
            .toPromise();
    }

}
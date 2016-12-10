import {Injectable}    from '@angular/core';
import {Headers, Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {Greeting} from '../brands/greeting';


@Injectable()
export class HelloWorldService {

    private helloWorldsUrl = 'rest/greeting';

   // private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http:Http) {
    }

    getGreeting():Promise<Greeting> {
        return this.http.get(this.helloWorldsUrl)
            .toPromise()
            .then(response => response.json() as Greeting)
            .catch(this.handleError);
    }

    private handleError(error:any):Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}
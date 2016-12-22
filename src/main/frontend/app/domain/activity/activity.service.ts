import {Injectable}    from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {Activity} from "./activity";



@Injectable()
export class ActivityService {

    private helloWorldsUrl = 'rest/activities';

    constructor(private http:Http) {
    }

    getActivities():Promise<Activity[]> {
        return this.http.get(this.helloWorldsUrl)
            .toPromise()
            .then(response => response.json() as Activity[])
            .catch(this.handleError);
    }

    private handleError(error:any):Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}
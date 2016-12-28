import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {Activity} from "./activity";


@Injectable()
export class ActivityService {

    private activitiesUrl = 'rest/activities';

    constructor(private http:Http) {
    }

    public getActivities():Promise<Activity[]> {
        return this.http.get(this.activitiesUrl)
            .toPromise()
            .then(response => response.json() as Activity[])
            .catch(this.handleError);
    }

    public getActivityByCode(activityCode:String) {
        return this.http.get(this.activitiesUrl + `?activityCode=${activityCode}`)
            .toPromise()
            .then(response => response.json() as Activity)
            .catch(this.handleError);
    }

    private handleError(error:any):Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
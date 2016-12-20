import {Component} from '@angular/core';
import {ActivityService} from "../domain/activity/activity.service";
import {Activity} from "../domain/activity/activity";

@Component({
    selector: 'my-app',
    templateUrl: 'home.html',
    styleUrls: ['home.css']
})
export class HomeComponent {

    activities:Activity[] = [];

    constructor(private activityService:ActivityService) {

    }

    ngOnInit():void {
        this.activityService.getActivities().then(activities => this.activities = activities.sort(Activity.byLabelComparator));
    }

}

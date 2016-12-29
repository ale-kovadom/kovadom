import {Component} from '@angular/core';
import {Activity} from "../../domain/activity/activity";
import {ActivityService} from "../../domain/activity/activity.service";
import {Router}            from '@angular/router';

@Component({
    selector: 'home',
    templateUrl: 'home.html',
    styleUrls: ['home.css']
})
export class HomeComponent {

    public activities:Activity[] = [];

    public selectedActivity:Activity;

    constructor(private activityService:ActivityService, private router:Router) {

    }

    ngOnInit():void {
        this.activityService.getActivities().then(
            activities => {
                this.activities = activities.sort(Activity.byLabelComparator);
                if (this.activities.length > 0) {
                    this.selectedActivity = this.activities[0];
                }
            });
    }

}

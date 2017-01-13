import {Component, Input, OnInit} from "@angular/core";
import {Activity} from "../../../domain/activity/activity";
import {ActivityService} from "../../../domain/activity/activity.service";

@Component({
    selector: 'activity',
    templateUrl: 'activity.html',
    styleUrls: ['activity.css']
})
export class ActivityComponent implements OnInit {

    @Input() public max: number = -1;

    public activityToDisplay: Activity[];

    constructor(private activityService: ActivityService) {
    }

    ngOnInit(): void {
        this.activityService.getActivities().then(
            activities => {
                let allActivities = activities.sort(Activity.byLabelComparator);
                this.activityToDisplay = this.max > 0 ? allActivities.slice(0, this.max) : allActivities;
            });
    }

}

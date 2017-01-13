import {Component, Input, SimpleChanges, OnChanges} from "@angular/core";
import {Activity} from "../../../domain/activity/activity";

@Component({
    selector: 'activity',
    templateUrl: 'activity.html',
    styleUrls: ['activity.css']
})
export class ActivityComponent implements OnChanges {

    @Input() public activities: Activity[];

    @Input() public max: number = -1;

    public activityToDisplay: Activity[];

    ngOnChanges(changes: SimpleChanges) {
        let allActivities = changes['activities'].currentValue as Activity[];
        this.activityToDisplay = this.max > 0 ? allActivities.slice(0, this.max) : allActivities;
    }

}

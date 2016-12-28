import {Component, Input, SimpleChanges, OnChanges} from "@angular/core";
import {Activity} from "../../../domain/activity/activity";

@Component({
    selector: 'activity',
    templateUrl: 'activity.html',
    styleUrls: ['activity.css']
})
export class ActivityComponent implements OnChanges {

    private static NUMBER_COLS:Number = 3;

    @Input() public activities:Activity[];

    @Input() public max:number;

    public activityToDisplay:Activity[];

    ngOnChanges(changes: SimpleChanges) {
        this.activityToDisplay = (changes['activities'].currentValue as Activity[]).slice(0, this.max);
    }

}

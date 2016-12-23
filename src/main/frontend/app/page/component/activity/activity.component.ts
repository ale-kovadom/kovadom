import {Component} from '@angular/core';
import {Activity} from "../../../domain/activity/activity";
import {Arrays} from "../../../util/arrays";
import {Input, SimpleChanges, OnChanges} from '@angular/core';

@Component({
    selector: 'activity',
    templateUrl: 'activity.html',
    styleUrls: ['activity.css']
})
export class ActivityComponent implements OnChanges {

    private static NUMBER_COLS:Number = 3;

    @Input() public activities:Activity[];

    @Input() public max:number;

    public rows:Activity[][];

    ngOnChanges(changes: SimpleChanges) {
        var slicesActivities = (changes['activities'].currentValue as Activity[]).slice(0, this.max);
        this.rows = Arrays.split(slicesActivities, ActivityComponent.NUMBER_COLS);
    }

}

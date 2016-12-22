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

    public rows:Activity[][];

    ngOnChanges(changes: SimpleChanges) {
        this.rows = Arrays.split(changes['activities'].currentValue as Activity[], ActivityComponent.NUMBER_COLS);
    }

}

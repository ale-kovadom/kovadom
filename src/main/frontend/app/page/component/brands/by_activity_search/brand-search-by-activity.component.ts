import {Component} from "@angular/core";
import {ActivityService} from "../../../../domain/activity/activity.service";
import {Activity} from "../../../../domain/activity/activity";
import {Router} from "@angular/router";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
    selector: 'brand-search-by-activity',
    templateUrl: 'brand-search-by-activity.html',
    styleUrls: ['brand-search-by-activity.css']
})
export class ActivitySearchComponent {

    public activities: Activity[] = [];

    public selectedActivity: Activity;

    constructor(private activityService: ActivityService, private router: Router, private route: ActivatedRoute) {

    }

    ngOnInit(): void {
        let activityCode: String;

        this.route.queryParams
            .switchMap((params: Params) => {
                    activityCode = params['activity'];
                    if (activityCode) {
                        activityCode = activityCode.toUpperCase();
                    }
                    return this.activityService.getActivities();
                }
            )
            .subscribe(activities => {
                let sortedActivities: Activity[] = activities.sort(Activity.byLabelComparator);
                if (sortedActivities.length > 0) {
                    this.selectedActivity = this.selectActivity(sortedActivities, activityCode);
                }
                this.activities = sortedActivities;
            });

    }

    public displayBrands() {
        if (this.selectedActivity == undefined) {
            return;
        }

        let navigationExtras = {
            queryParams: {'activity': this.selectedActivity.code.toLowerCase()}
        };
        this.router.navigate(['/brands'], navigationExtras);
    }

    private selectActivity(sortedActivities: Activity[], activityCode: String) {
        let selectedActivity = sortedActivities[0];
        if (activityCode) {
            let selectedActivities = sortedActivities.filter(a => {
                return a.code === activityCode
            });
            if (selectedActivities.length > 0) {
                selectedActivity = selectedActivities[0];
            }
        }
        return selectedActivity;
    }


}

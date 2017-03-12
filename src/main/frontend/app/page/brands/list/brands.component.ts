import {Component} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {BrandService} from "../../../domain/brand/brand.service";
import {Brand} from "../../../domain/brand/brand";
import "rxjs/add/operator/switchMap";
import {Activity} from "../../../domain/activity/activity";
import {ActivityService} from "../../../domain/activity/activity.service";

@Component({
    selector: 'brands',
    templateUrl: 'brands.html',
    styleUrls: ['brands.css']
})
export class BrandsComponent {

    public brands:Brand[];

    public activity:Activity;

    constructor(private route:ActivatedRoute,
                private brandService:BrandService,
                private activityService:ActivityService) {
    }

    ngOnInit():void {
        this.route.queryParams
            .switchMap((params:Params) => this.activityService.getActivityByCode(params['activity']))
            .subscribe(activity => {this.activity = activity; this.brands = activity.brands});
        
        // this.route.queryParams
        //     .switchMap((params:Params) => this.brandService.getBrandsByActivityCode(params['activity']))
        //     .subscribe(brands => this.brands = brands);
    }
}

import {Component} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {BrandService} from "../../../domain/brand/brand.service";
import {Brand} from "../../../domain/brand/brand";
import "rxjs/add/operator/switchMap";
import {Activity} from "../../../domain/activity/activity";
import {ActivityService} from "../../../domain/activity/activity.service";

@Component({
    selector: 'brand-detail',
    templateUrl: 'brand-detail.html',
    styleUrls: ['brand-detail.css']
})
export class BrandDetailComponent {

    public brand:Brand;

    constructor(private route:ActivatedRoute,
                private brandService:BrandService) {
    }

    ngOnInit():void {
        this.route.params
            .switchMap((params:Params) => this.brandService.getBrand(params['brandCode']))
            .subscribe(brand => this.brand = brand);
    }
}

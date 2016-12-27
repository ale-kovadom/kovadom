import {Component} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {BrandService} from "../../../domain/brand/brand.service";
import {Brand} from "../../../domain/brand/brand";
import "rxjs/add/operator/switchMap";

@Component({
    selector: 'brands',
    templateUrl: 'brands.html',
    styleUrls: ['brands.css']
})
export class BrandsComponent {

    public brands:Brand[] = [];

    constructor(private route:ActivatedRoute, private brandService:BrandService) {
    }

    ngOnInit():void {
        this.route.params
            .switchMap((params:Params) => this.brandService.getBrandsByActivityCode(params['activityCode']))
            .subscribe(brands => this.brands = brands);
    }
}

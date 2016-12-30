import {Component, ViewChild} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {BrandService} from "../../../domain/brand/brand.service";
import {Brand} from "../../../domain/brand/brand";
import "rxjs/add/operator/switchMap";
import {KSSwiperContainer} from "../../component/ui/swiper/ui.swiper.component";

@Component({
    selector: 'brand-detail',
    templateUrl: 'brand-detail.html',
    styleUrls: ['brand-detail.css']
})
export class BrandDetailComponent {

    @ViewChild(KSSwiperContainer) swiperContainer:KSSwiperContainer;

    public brand:Brand;

    public slides:Array<String> = [];

    swiperOption:any;

    constructor(private route:ActivatedRoute,
                private brandService:BrandService) {

        this.swiperOption = {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            spaceBetween: 30,
            effect: 'fade',
            loop: true,
            autoHeight: false
        };
    }

    ngOnInit():void {
        this.route.params
            .switchMap((params:Params) => this.brandService.getBrand(params['brandCode']))
            .subscribe(brand => {
                this.brand = brand;
                [1, 2, 3].forEach(i => this.slides.push(`static/brands/${this.brand.code}/slider/${i}.png`));
            });
    }

}
import {Component, ViewChild} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {BrandService} from "../../../domain/brand/brand.service";
import {Brand} from "../../../domain/brand/brand";
import "rxjs/add/operator/switchMap";
import {Sale} from "../../../domain/sale/sale";
import {Host} from "../../../domain/host/host";
import {NgForm, AbstractControl} from "@angular/forms";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
    selector: 'brand-detail',
    templateUrl: 'brand-detail.html',
    styleUrls: ['brand-detail.css']
})
export class BrandDetailComponent {

    public brand: Brand;

    public slides: Array<String> = [];

    public swiperOptions: any;

    public sale: Sale = new Sale("", "", new Host("", "", "", ""));

    public date: Date;

    public moreFieldClass: String = "";

    public hasBeenSubmitted: boolean = false;

    constructor(private route: ActivatedRoute,
                private brandService: BrandService) {

        this.swiperOptions = {
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

    public ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.brandService.getBrand(params['brandCode']))
            .subscribe(brand => {
                this.brand = brand;
                [1, 2, 3].forEach(i => this.slides.push(`static/brands/${this.brand.code}/slider/${i}.png`));
                this.sale.brandCode = this.brand.code;
            });
    }

    public onSubmit() {
        let hasBeenExpanded = this.moreFieldClass != "";

        if (hasBeenExpanded) {
            this.hasBeenSubmitted = true;
        } else {
            this.moreFieldClass = "expanded";
        }
    }


}
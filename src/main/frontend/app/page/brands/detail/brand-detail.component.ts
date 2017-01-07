import {Component, ViewChild} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {BrandService} from "../../../domain/brand/brand.service";
import {Brand} from "../../../domain/brand/brand";
import "rxjs/add/operator/switchMap";
import {Sale} from "../../../domain/sale/sale";
import {NgForm} from "@angular/forms";

@Component({
    selector: 'brand-detail',
    templateUrl: 'brand-detail.html',
    styleUrls: ['brand-detail.css']
})
export class BrandDetailComponent {

    private static STATUS_NOT_SUBMITTED = "notSubmitted";

    private static STATUS_SENT = "sent";

    private static STATUS_CONFIRMED = "confirmed";

    private static SUCCESS_ALERT_CLASS: string = "alert alert-success";

    private static MORE_FIELD_CLASS: string = "";

    public brand: Brand;

    public slides: Array<String> = [];

    public swiperOptions: any;

    public sale: Sale = Sale.empty();

    public moreFieldClass: String;

    public isFormFullyOpened: boolean = false;

    public submitStatus: string;

    public successAlertClass: string;

    @ViewChild("saleForm")
    public form: NgForm;

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

        this.resetMoreFieldsClass();
        this.resetSuccessAlertClass();
        this.resetSubmitStatus();

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
            this.isFormFullyOpened = true;
            if (this.form.form.valid) {
                this.submitStatus = BrandDetailComponent.STATUS_SENT;
                //TODO requete
                //TODO scroll
                this.submitStatus = BrandDetailComponent.STATUS_CONFIRMED;
                setTimeout(() => {
                    this.successAlertClass += " fade-out";
                    setTimeout(() => {
                        // After fade-out
                        this.resetMoreFieldsClass();
                        this.resetSuccessAlertClass();
                        this.resetSubmitStatus();
                        this.isFormFullyOpened = false;
                        this.form.reset();
                        this.sale = Sale.empty();
                    }, 2000);
                }, 3000);
            }
        } else {
            this.moreFieldClass = "expanded";
        }
    }

    private resetSuccessAlertClass() {
        this.successAlertClass = BrandDetailComponent.SUCCESS_ALERT_CLASS;
    }

    private resetSubmitStatus() {
        this.submitStatus = BrandDetailComponent.STATUS_NOT_SUBMITTED;
    }

    private resetMoreFieldsClass() {
        this.moreFieldClass = BrandDetailComponent.MORE_FIELD_CLASS;
    }

}
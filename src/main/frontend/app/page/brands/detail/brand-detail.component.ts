import {Component, ViewChild, Inject} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {BrandService} from "../../../domain/brand/brand.service";
import {Brand} from "../../../domain/brand/brand";
import "rxjs/add/operator/switchMap";
import {Sale, SaleStatus} from "../../../domain/sale/sale";
import {NgForm} from "@angular/forms";
import {SaleService} from "../../../domain/sale/sale.service";
import {PageScrollService, PageScrollInstance, PageScrollConfig} from "ng2-page-scroll";
import {DOCUMENT} from "@angular/platform-browser";
import {FormStatus} from "../../../framework/form/forms";

@Component({
    selector: 'brand-detail',
    templateUrl: 'brand-detail.html',
    styleUrls: ['brand-detail.css']
})
export class BrandDetailComponent {

    private static FORM_COLLAPSE_CLASS: string = "";

    private static FORM_EXPAND_CLASS: string = "expanded";

    private static emptySale(brand: Brand) {
        let sale = Sale.empty();
        sale.brandCode = brand.code;
        return sale;
    }

    public brand: Brand;

    public slides: Array<String> = [];

    public swiperOptions: any;

    public sale: Sale = Sale.empty();

    public moreFieldClass: String;

    public showExplicitErrorMessage: boolean = false;

    public formStatus = FormStatus;

    public submitStatus: FormStatus;

    @ViewChild("saleForm")
    public ngForm: NgForm;


    constructor(private route: ActivatedRoute,
                private brandService: BrandService,
                private saleService: SaleService,
                private pageScrollService: PageScrollService,
                @Inject(DOCUMENT) private document: any) {

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

        this.collapseForm();
        this.resetSubmitStatus();

    }

    public ngOnInit(): void {
        PageScrollConfig.defaultScrollOffset = 300;
        PageScrollConfig.defaultDuration = 400;
        this.route.params
            .switchMap((params: Params) => this.brandService.getBrand(params['brandCode']))
            .subscribe(brand => {
                this.brand = brand;
                [1, 2, 3].forEach(i => this.slides.push(`static/brands/${this.brand.code}/slider/${i}.png`));
                this.sale = BrandDetailComponent.emptySale(this.brand);
            });
    }

    public verifyAvailability() {
        this.sale.status = SaleStatus.Availability;
    }

    public book() {
        this.sale.status = SaleStatus.BookRequest;
    }

    public onSubmit() {
        let hasBeenExpanded = this.moreFieldClass != "";

        if (hasBeenExpanded) {
            this.showExplicitErrorMessage = true;
            if (this.ngForm.form.valid) {
                this.submitStatus = FormStatus.Sent;
                this.saleService.create(this.sale).then(this.onSuccess(this)).catch(this.onError(this))
            }
        } else {
            this.expandForm();
        }
    }

    public onAlertDismissal() {
        if (this.submitStatus = FormStatus.Confirmed) {
            this.collapseForm();
            this.showExplicitErrorMessage = false;
            this.ngForm.reset();
            this.sale = BrandDetailComponent.emptySale(this.brand);
        }
        this.resetSubmitStatus();
    }

    private onSuccess(self: BrandDetailComponent) {
        return () => {
            self.submitStatus = FormStatus.Confirmed;
            this.goToAlert();
        }
    }

    private onError(self: BrandDetailComponent) {
        return (error: any) => {
            console.error(error);
            self.submitStatus = FormStatus.Failed;
        }
    }


    private resetSubmitStatus() {
        this.submitStatus = FormStatus.NotSubmitted;
    }

    private expandForm() {
        this.moreFieldClass = BrandDetailComponent.FORM_EXPAND_CLASS;
    }

    private collapseForm() {
        this.moreFieldClass = BrandDetailComponent.FORM_COLLAPSE_CLASS;
    }

    private goToAlert() {
        this.pageScrollService.start(PageScrollInstance.simpleInstance(this.document, '#alert-form'));
    }

}
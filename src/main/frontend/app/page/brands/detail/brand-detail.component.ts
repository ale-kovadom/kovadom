import {Component, ViewChild, Inject} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {BrandService} from "../../../domain/brand/brand.service";
import {Brand} from "../../../domain/brand/brand";
import "rxjs/add/operator/switchMap";
import {Sale, SaleStatus} from "../../../domain/sale/sale";
import {NgForm} from "@angular/forms";
import {SaleService} from "../../../domain/sale/sale.service";
import {PageScrollService, PageScrollInstance, PageScrollConfig, EasingLogic} from "ng2-page-scroll";
import {DOCUMENT} from "@angular/platform-browser";

@Component({
    selector: 'brand-detail',
    templateUrl: 'brand-detail.html',
    styleUrls: ['brand-detail.css']
})
export class BrandDetailComponent {

    private static STATUS_NOT_SUBMITTED = "notSubmitted";

    private static STATUS_SENT = "sent";

    private static STATUS_CONFIRMED = "confirmed";

    private static STATUS_FAILED = "failed";

    private static SUCCESS_ALERT_CLASS: string = "alert alert-success";

    private static ERROR_ALERT_CLASS: string = "alert alert-danger";

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

    public submitStatus: string;

    public alertClass: string;

    @ViewChild("saleForm")
    public form: NgForm;


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
            if (this.form.form.valid) {
                this.submitStatus = BrandDetailComponent.STATUS_SENT;
                this.saleService.create(this.sale).then(this.onSuccess(this)).catch(this.onError(this))
            }
        } else {
            this.expandForm();
        }
    }

    private onSuccess(self: BrandDetailComponent) {
        return () => {
            self.displaySuccessAlert(self).then(() => {
                    self.fadeOutAlert(self).then(() => {
                        self.collapseForm();
                        self.resetSubmitStatus();
                        self.showExplicitErrorMessage = false;
                        self.form.reset();
                        self.sale = BrandDetailComponent.emptySale(self.brand);
                    });
                }
            );
        }
    }

    private onError(self: BrandDetailComponent) {
        return (error: any) => {
            console.error(error);

            self.displayErrorAlert(self).then(() => {
                self.fadeOutAlert(self).then(() => {
                    self.resetSubmitStatus();
                });
            });
        }
    }

    private displaySuccessAlert(self: BrandDetailComponent) {
        return self.displayAlert(self, BrandDetailComponent.SUCCESS_ALERT_CLASS, BrandDetailComponent.STATUS_CONFIRMED);
    }

    private displayErrorAlert(self: BrandDetailComponent) {
        return self.displayAlert(self, BrandDetailComponent.ERROR_ALERT_CLASS, BrandDetailComponent.STATUS_FAILED);
    }

    private displayAlert(self: BrandDetailComponent, alertClass: string, newStatus: string) {
        return new Promise((resolve, reject) => {
            self.alertClass = alertClass;
            self.submitStatus = newStatus;
            this.goToAlert();
            setTimeout(() => {
                resolve();
            }, 3000);
        });
    }

    private fadeOutAlert(self: BrandDetailComponent) {
        return new Promise((resolve, reject) => {
            self.alertClass += " fade-out";
            setTimeout(() => {
                resolve();
            }, 2000);
        });
    }


    private resetSubmitStatus() {
        this.submitStatus = BrandDetailComponent.STATUS_NOT_SUBMITTED;
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
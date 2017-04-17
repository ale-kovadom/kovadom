import {Component, ViewChild, Inject, Renderer} from "@angular/core";
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
import {SwiperSlide} from "../../../framework/ui/swiper/swiper.slides";

declare let google: any;

@Component({
    selector: 'brand-detail',
    templateUrl: 'brand-detail.html',
    styleUrls: ['brand-detail.css']
})
export class BrandDetailComponent {

    private static FORM_COLLAPSE_CLASS: string = "";

    private static FORM_EXPAND_CLASS: string = "expanded";

    private static SCROLL_OFFSET_ALERT_FORM: number = 400;

    private static SCROLL_DURATION: number = 400;

    public brand: Brand;

    public slides: Array<SwiperSlide> = [];

    public swiperOptions: any;

    public sale: Sale = Sale.empty();

    public moreFieldClass: String;

    public showExplicitErrorMessage: boolean = false;

    public formStatus = FormStatus;

    public submitStatus: FormStatus;

    public time: Date;

    public date: Date;

    @ViewChild('place')
    public addressInput: any;

    private addressAutocomplete: any;

    private selectedLocation?: any;

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
            autoHeight: false,
            parallax: true
        };

        this.collapseForm();
        this.resetSubmitStatus();

    }

    public ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.brandService.getBrand(params['brandCode']))
            .subscribe(brand => {
                this.brand = brand;
                this.slides = this.brand.brandShowcaseImages.map(img => new SwiperSlide(img.imageUrl, img.description));
                this.sale = this.emptySale();

                // Once data is loaded
                this.route.fragment.subscribe(anchor => {
                    setTimeout(() => { // Wait for data to be displayed
                        const element = this.document.querySelector("#" + anchor);
                        if (element) {
                            element.scrollIntoView(false);
                        }
                    });
                });
            });


    }

    public ngAfterViewInit(): void {
        let addressInputOptions: any = {
            types: ['address'],
            componentRestrictions: {country: 'fr'}  //TODO i18n
        };
        this.addressAutocomplete = new google.maps.places.Autocomplete(this.addressInput.nativeElement, addressInputOptions);
        this.addressAutocomplete.addListener('place_changed', this.onAutoCompleteChange(this));
    }

    onAutoCompleteChange(self: any) {
        return (evt: any) => {
            let place = self.addressAutocomplete.getPlace();
            this.sale.place.address = place.formatted_address;
            this.sale.place.latitude = place.geometry.location.lat();
            this.sale.place.longitude = place.geometry.location.lng();
            this.selectedLocation = place;
        }
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

            if(!this.selectedLocation) {
                /* If an address is not recognized by the autocomplete field then an error on the mandatory address field is raised */
                this.sale.place.address = undefined;
                /*
                 * Note: we return her because the form may be valid if address field is not empty
                 * (because validation has already been done when submit has been triggered).
                 * After "return": it will be set to invalid.
                 */
                return;
            }

            if (this.ngForm.form.valid) {

                this.sale.date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), this.time.getHours(), this.time.getMinutes(), 0, 0);
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
            this.sale = this.emptySale();
            this.selectedLocation = undefined;
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
        this.pageScrollService.start(
            PageScrollInstance.advancedInstance(this.document, '#alert-form', null, null, BrandDetailComponent.SCROLL_OFFSET_ALERT_FORM, false, null, BrandDetailComponent.SCROLL_DURATION, null));
    }

    private emptySale() {
        let sale = Sale.empty();
        sale.brandCode = this.brand.code;

        this.date = undefined;
        this.time = undefined;

        return sale;
    }

}
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";
import {KovadomComponent} from "./page/component/kovadom/kovadom.component";
import {ActivityService} from "./domain/activity/activity.service";
import {AppRoutingModule} from "./app-routing.module";
import {HomeComponent} from "./page/home/home.component";
import {ActivityComponent} from "./page/component/activity/activity.component";
import {ContactComponent} from "./page/component/contact/banner/contact.component";
import {BrandsComponent} from "./page/brands/list/brands.component";
import {FormsModule} from "@angular/forms";
import {BrandService} from "./domain/brand/brand.service";
import {ActivitySearchComponent} from "./page/component/brands/by_activity_search/brand-search-by-activity.component";
import {BrandDetailComponent} from "./page/brands/detail/brand-detail.component";
import {FrameworkModule} from "./framework/framework.module";
import {SaleService} from "./domain/sale/sale.service";
import {Ng2PageScrollModule} from "ng2-page-scroll";
import {ActivitiesComponent} from "./page/activities/activities.component";
import {PageNotFoundComponent} from "./page/page_not_found/page-not-found.component";
import {HomeSaleHowToComponent} from "./page/home_sale_how_to/home-sale.how-to.component";
import {SaleHowtoStepsComponent} from "./page/component/sale_how_to_steps/sale.how-to.steps.component";
import {DialogModule} from "primeng/primeng";
import {CompanyRegistrationComponent} from "./page/component/registration/company/company-registration";
import {RegistrationService} from "./domain/contact/registrationService";
import {EmailFormComponent} from "./page/component/form/email/email.form.component";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        AppRoutingModule,
        FormsModule,
        FrameworkModule,
        DialogModule,
        Ng2PageScrollModule.forRoot()
    ],
    declarations: [
        PageNotFoundComponent,
        KovadomComponent,
        HomeComponent,
        ActivityComponent,
        ActivitySearchComponent,
        ContactComponent,
        BrandsComponent,
        BrandDetailComponent,
        ActivitiesComponent,
        SaleHowtoStepsComponent,
        HomeSaleHowToComponent,
        CompanyRegistrationComponent,
        EmailFormComponent
    ],
    providers: [ActivityService, BrandService, SaleService, RegistrationService],
    bootstrap: [KovadomComponent]
})
export class AppModule {
}

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
import {GMapModule} from 'primeng/primeng';
import {RegistrationService} from "./domain/contact/registrationService";
import {EmailFormComponent} from "./page/component/form/email/email.form.component";
import {PhoneFormComponent} from "./page/component/form/phone/phone.form.component";
import {ValidationFormComponent} from "./page/component/form/validation/validation.form.component";
import {ConfirmationMessageEmailComponent} from "./page/component/form/message/confirmation-message.form.component";
import {ContactRegistrationComponent} from "./page/component/registration/contact-registration";
import {newShoppingXpComponent} from "./page/component/new_shopping_xp/new-shopping-xp.component";
import {KovadomAdvantagesComponent} from "./page/component/kovadom_advantages/kovadom.advantages.component";
import {TestGmapComponent} from "./page/test/test.component";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        AppRoutingModule,
        FormsModule,
        FrameworkModule,
        DialogModule,
        GMapModule,
        Ng2PageScrollModule.forRoot(),
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
        newShoppingXpComponent,
        HomeSaleHowToComponent,
        KovadomAdvantagesComponent,
        ContactRegistrationComponent,
        EmailFormComponent,
        PhoneFormComponent,
        ValidationFormComponent,
        ConfirmationMessageEmailComponent
    ],
    providers: [ActivityService, BrandService, SaleService, RegistrationService],
    bootstrap: [KovadomComponent]
})
export class AppModule {
}

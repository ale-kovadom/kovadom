import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";
import {KovadomComponent} from "./page/component/kovadom/kovadom.component";
import {ActivityService} from "./domain/activity/activity.service";
import {AppRoutingModule} from "./app-routing.module";
import {HomeComponent} from "./page/home/home.component";
import {ActivityComponent} from "./page/component/activity/activity.component";
import {ContactComponent} from "./page/component/contact/contact.component";
import {BrandsComponent} from "./page/brands/list/brands.component";
import {FormsModule} from "@angular/forms";
import {BrandService} from "./domain/brand/brand.service";
import {AllBrandsButtonComponent} from "./page/component/brands/all_brands_button/all-brands.button.component";
import {ActivitySearchComponent} from "./page/component/brands/by_activity_search/brand-search-by-activity.component";
import {BrandDetailComponent} from "./page/brands/detail/brand-detail.component";
import {FrameworkModule} from "./framework/framework.module";
import {SaleService} from "./domain/sale/sale.service";
import {Ng2PageScrollModule} from 'ng2-page-scroll';
import {ActivitiesComponent} from "./page/activities/activities.component";
import {PageNotFoundComponent} from "./page/page_not_found/page-not-found.component";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        AppRoutingModule,
        FormsModule,
        FrameworkModule,
        Ng2PageScrollModule.forRoot()
    ],
    declarations: [
        PageNotFoundComponent,
        KovadomComponent,
        HomeComponent,
        ActivityComponent,
        AllBrandsButtonComponent,
        ActivitySearchComponent,
        ContactComponent,
        BrandsComponent,
        BrandDetailComponent,
        ActivitiesComponent
    ],
    providers: [ActivityService, BrandService, SaleService],
    bootstrap: [KovadomComponent]
})
export class AppModule {
}

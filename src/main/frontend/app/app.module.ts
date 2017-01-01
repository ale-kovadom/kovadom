import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule}    from '@angular/http';

import {KovadomComponent}  from './page/component/kovadom/kovadom.component';
import {ActivityService}  from './domain/activity/activity.service';
import {AppRoutingModule} from "./app-routing.module";
import {HomeComponent} from "./page/home/home.component";
import {ActivityComponent} from "./page/component/activity/activity.component";
import {ContactComponent} from "./page/component/contact/contact.component";
import {BrandsComponent} from "./page/brands/list/brands.component";
import {FormsModule} from '@angular/forms';
import {BrandService} from "./domain/brand/brand.service";
import {AllBrandsButtonComponent} from "./page/component/brands/all_brands_button/all-brands.button.component";
import {ActivitySearchComponent} from "./page/component/brands/by_activity_search/brand-search-by-activity.component";
import {BrandDetailComponent} from "./page/brands/detail/brand-detail.component";
import {KSSwiperContainer} from "./page/component/ui/swiper/ui.swiper.component";
import {CalendarModule} from "primeng/components/calendar/calendar";
import {CalendarComponent} from "./page/component/ui/calendar/ui.calendar.component";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        AppRoutingModule,
        FormsModule,
        CalendarModule
    ],
    declarations: [
        KovadomComponent,
        HomeComponent,
        ActivityComponent,
        AllBrandsButtonComponent,
        ActivitySearchComponent,
        KSSwiperContainer,
        CalendarComponent,
        ContactComponent,
        BrandsComponent,
        BrandDetailComponent],
    providers: [ActivityService, BrandService],
    bootstrap: [KovadomComponent]
})
export class AppModule {
}

import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule}    from '@angular/http';

import {KovadomComponent}  from './page/component/kovadom/kovadom.component';
import {ActivityService}  from './domain/activity/activity.service';
import {AppRoutingModule} from "./app-routing.module";
import {HomeComponent} from "./page/home/home.component";
import {ActivityComponent} from "./page/component/activity/activity.component";
import {ContactComponent} from "./page/component/contact/contact.component";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        AppRoutingModule
    ],
    declarations: [KovadomComponent, HomeComponent, ActivityComponent, ContactComponent],
    providers: [ActivityService],
    bootstrap: [KovadomComponent]
})
export class AppModule {
}

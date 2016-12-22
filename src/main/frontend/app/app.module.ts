import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule}    from '@angular/http';

import {KovadomComponent}  from './kovadom/kovadom.component';
import {ActivityService}  from './domain/activity/activity.service';
import {AppRoutingModule} from "./app-routing.module";
import {HomeComponent} from "./page/home/home.component";
import {ActivityComponent} from "./page/component/activity/activity.component";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        AppRoutingModule
    ],
    declarations: [KovadomComponent, HomeComponent, ActivityComponent],
    providers: [ActivityService],
    bootstrap: [KovadomComponent]
})
export class AppModule {
}

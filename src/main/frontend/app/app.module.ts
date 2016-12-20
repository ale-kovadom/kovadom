import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule}    from '@angular/http';

import {KovadomComponent}  from './kovadom/kovadom.component';
import {ActivityService}  from './domain/activity/activity.service';
import {AppRoutingModule} from "./app-routing.module";
import {HomeComponent} from "./home/home.component";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        AppRoutingModule
    ],
    declarations: [KovadomComponent, HomeComponent],
    providers: [ActivityService],
    bootstrap: [KovadomComponent]
})
export class AppModule {
}

import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule}    from '@angular/http';

import {AppComponent}  from './app.component';
import {HelloWorldService}  from './service/hello-world.service';
import {AppRoutingModule} from "./app-routing.module";
import {DetailComponent} from "./brands/detail.component";
import {HomeComponent} from "./home/home.component";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        AppRoutingModule
    ],
    declarations: [AppComponent, HomeComponent, DetailComponent],
    providers: [HelloWorldService],
    bootstrap: [AppComponent]
})
export class AppModule {
}

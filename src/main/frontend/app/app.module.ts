import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule}    from '@angular/http';

import {AppComponent}  from './brands/app.component';
import {HelloWorldService}  from './service/hello-world.service';
import {AppRoutingModule} from "./app-routing.module";
import {DetailComponent} from "./brands/detail.component";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        AppRoutingModule
    ],
    declarations: [AppComponent, DetailComponent],
    providers: [HelloWorldService],
    bootstrap: [AppComponent]
})
export class AppModule {
}

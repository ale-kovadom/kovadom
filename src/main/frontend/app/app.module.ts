import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';

import {AppComponent}  from './brands/app.component';
import {HelloWorldService}  from './service/hello-world.service';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule
    ],
    declarations: [AppComponent],
    providers: [HelloWorldService],
    bootstrap: [AppComponent]
})
export class AppModule {
}

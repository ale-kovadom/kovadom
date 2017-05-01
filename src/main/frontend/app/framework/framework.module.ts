import {NgModule, ModuleWithProviders} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {CalendarModule} from "primeng/components/calendar/calendar";
import {SwiperContainer} from "./ui/swiper/ui.swiper.component";
import {CalendarDirective} from "./ui/calendar/ui.calendar.directive";
import {GeolocatorService} from "./geolocator/geolocator.service";
import {BrowserGlobalContext, GlobalContext} from "./context/NativeGlobalContext";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CalendarModule
    ],
    declarations: [
        SwiperContainer,
        CalendarDirective,
    ],
    exports: [
        CalendarModule,
        CalendarDirective,
        SwiperContainer,
    ],
    providers: [
        GeolocatorService
    ]
})
export class FrameworkModule {

    static forBrowser(): ModuleWithProviders {
        return {
            ngModule: FrameworkModule,
            providers: [
                { provide: GlobalContext, useClass: BrowserGlobalContext }
            ]
        };
    }
    
}
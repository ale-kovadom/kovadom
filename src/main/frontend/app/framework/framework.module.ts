import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import {CalendarComponent} from "./ui/calendar/ui.calendar.component";
import {CalendarModule} from "primeng/components/calendar/calendar";
import {SwiperContainer} from "./ui/swiper/ui.swiper.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CalendarModule
    ],
    declarations: [
        CalendarComponent,
        SwiperContainer
    ],
    exports: [
        CalendarComponent,
        SwiperContainer
    ]
})
export class FrameworkModule {}
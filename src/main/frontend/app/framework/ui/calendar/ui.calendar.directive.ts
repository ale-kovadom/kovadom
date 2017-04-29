import {Directive, Input, OnInit} from "@angular/core";
import {Calendar} from "primeng/components/calendar/calendar";

@Directive({selector: '[calendarOptions]'})
export class CalendarDirective implements OnInit {

    private static LOCALE_CONF: any = {
        'en-gb': {
            firstDayOfWeek: 0,
            dayNames: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
            dayNamesShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
            dayNamesMin: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
            monthNames: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
            monthNamesShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
            hourFormat: 12,
            dateFormat: 'dd/mm/yy'
        },
        'en-us': {
            firstDayOfWeek: 0,
            dayNames: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
            dayNamesShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
            dayNamesMin: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
            monthNames: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
            monthNamesShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
            hourFormat: 12,
            dateFormat: 'mm/dd/yy'
        },
        'fr-fr': {
            firstDayOfWeek: 1,
            dayNames: 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
            dayNamesShort: 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
            dayNamesMin: 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
            monthNames: 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
            monthNamesShort: 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
            hourFormat: 24,
            dateFormat: 'dd/mm/yy'
        }
    };

    @Input('lang')
    public lang: string;

    private pCalendar: Calendar;

    constructor(pCalendar: Calendar) {
        this.pCalendar = pCalendar;
    }

    public ngOnInit() {
        if (!this.lang) {
            throw new ReferenceError("No 'lang' parameter has been specified in CalendarDirective");
        }
        this.pCalendar.locale = CalendarDirective.LOCALE_CONF[this.lang];
        this.pCalendar.hourFormat = CalendarDirective.LOCALE_CONF[this.lang].hourFormat;
        this.pCalendar.dateFormat = CalendarDirective.LOCALE_CONF[this.lang].dateFormat;
    }

}
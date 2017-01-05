import {Component, forwardRef, Input, OnInit, ElementRef, ViewChild, Renderer, AfterViewInit} from "@angular/core";
import {NG_VALUE_ACCESSOR, ControlValueAccessor, NgModel} from "@angular/forms";

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CalendarComponent),
    multi: true
};

@Component({
    selector: 'calendar',
    templateUrl: 'ui.calendar.html',
    styleUrls: ['ui.calendar.css'],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class CalendarComponent implements ControlValueAccessor, OnInit, AfterViewInit {

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

    private propagateChange = (_: any) => {
    };

    _value: Date;

    @Input()
    public lang: string = "en-us";

    @Input()
    public required: boolean = false;


    public messageLocale: any;

    public hourFormat: String;

    public dateFormat: String;

    constructor(private rd: Renderer) {

    }

    public ngOnInit() {
        this.messageLocale = CalendarComponent.LOCALE_CONF[this.lang];
        this.hourFormat = CalendarComponent.LOCALE_CONF[this.lang].hourFormat;
        this.dateFormat = CalendarComponent.LOCALE_CONF[this.lang].dateFormat;
    }


    public ngAfterViewInit() {
        // Fix css with bootstrap
        let inputElement = this.rd.selectRootElement(".ui-inputtext");
        this.rd.setElementClass(inputElement, "form-control", true);
    }

    public get value() {
        return this._value;
    }

    public set value(val: Date) {
        this._value = val;
        this.propagateChange(this._value);
    }

    public registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    public writeValue(val: any) {
        this._value = val;
    }

    public registerOnTouched() {
    }


}

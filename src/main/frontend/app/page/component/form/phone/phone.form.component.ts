import {Component, forwardRef, Input} from "@angular/core";
import {NG_VALUE_ACCESSOR, ControlValueAccessor, NG_VALIDATORS, FormControl} from "@angular/forms";

@Component({
    selector: 'phone-form',
    templateUrl: 'phone.form.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => PhoneFormComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => PhoneFormComponent),
            multi: true
        }
    ]
})
export class PhoneFormComponent implements ControlValueAccessor {

    // TODO i18n
    public readonly regexp = /^(?:0|\(?\+33\)?\s?|0033\s?)[1-79](?:[\.\-\s]?\d\d){4}$/i;

    @Input()
    public _phone: string = "";

    public propagateChange = (_: any) => {
    };

    public registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    public registerOnTouched() {
    }

    public writeValue(value: any) {
        this._phone = value;
    }

    public get phone() {
        return this._phone;
    }

    public set phone(val) {
        this._phone = val;
        this.propagateChange(val);
    }

    public validate(c: FormControl) {

        return this.regexp.test(c.value) ? null : {
                pattern: {
                    valid: false
                }
            };
    }

}

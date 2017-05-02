import {Component, forwardRef, Input, ViewChild} from "@angular/core";
import {NG_VALUE_ACCESSOR, ControlValueAccessor, NG_VALIDATORS, FormControl} from "@angular/forms";

@Component({
    selector: 'email-form',
    templateUrl: 'email.form.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => EmailFormComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => EmailFormComponent),
            multi: true
        }
    ]
})
export class EmailFormComponent implements ControlValueAccessor {

    // TODO i18n
    public readonly regexp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,10}$/i;

    @Input()
    public _email: string = "";

    public propagateChange = (_: any) => {
    };

    public registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    public registerOnTouched() {
    }

    public writeValue(value: any) {
        this._email = value;
    }

    public get email() {
        return this._email;
    }

    public set email(val) {
        this._email = val;
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

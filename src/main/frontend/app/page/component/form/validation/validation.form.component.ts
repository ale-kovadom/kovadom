import {Component, Input} from "@angular/core";
import {ControlValueAccessor, FormControl} from "@angular/forms";

@Component({
    selector: 'form-validation',
    templateUrl: 'validation.form.html'
})
export class ValidationFormComponent {

    @Input()
    public ref: FormControl;

    @Input()
    public onlyIf: boolean = true;

    @Input()
    public required: boolean = false;

    @Input()
    public pattern: boolean = false;

}

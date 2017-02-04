import {Component, ViewChild, Input} from "@angular/core";
import "rxjs/add/operator/switchMap";
import {Contact} from "../../../domain/contact/contact";
import {NgForm} from "@angular/forms";
import {RegistrationService} from "../../../domain/contact/registrationService";
import {FormStatus} from "../../../framework/form/forms";

@Component({
    selector: 'contact-registration',
    templateUrl: 'contact-registration.html',
    styleUrls: ['contact-registration.css']
})
export class ContactRegistrationComponent {

    public static readonly COMPANY_MODE: string = "company_mode";

    public static readonly SALE_MODE: string = "sale_mode";

    public contact: Contact = Contact.empty();

    public showExplicitErrorMessage: boolean = false;

    public formStatus = FormStatus;

    public submitStatus: FormStatus = FormStatus.NotSubmitted;

    @ViewChild("registrationForm")
    public ngForm: NgForm;

    @Input()
    public mode: string;

    constructor(private registrationService: RegistrationService) {

    }

    public onSubmit() {
        this.showExplicitErrorMessage = true;

        if (this.ngForm.form.valid) {
            this.submitStatus = FormStatus.Sent;

            let register: Promise<void>;
            if (this.mode == ContactRegistrationComponent.COMPANY_MODE) {
                register = this.registrationService.registerCompany(this.contact);
            } else if (this.mode == ContactRegistrationComponent.SALE_MODE) {
                register = this.registrationService.registerSale(this.contact);
            } else {
                throw new Error("Registration mode is incorrect: '" + this.mode + "'");
            }
            register.then(this.onSuccess(this)).catch(this.onError(this))
        }
    }

    public onAlertDismissal() {
        if (this.submitStatus == FormStatus.Confirmed) {
            this.showExplicitErrorMessage = false;
            this.ngForm.reset();
            this.contact = Contact.empty();
        }

        this.submitStatus = FormStatus.NotSubmitted;
    }

    private onSuccess(self: ContactRegistrationComponent) {
        return () => {
            self.submitStatus = FormStatus.Confirmed;
        }
    }

    private onError(self: ContactRegistrationComponent) {
        return (error: any) => {
            console.error(error);
            self.submitStatus = FormStatus.Failed;
        }
    }

}
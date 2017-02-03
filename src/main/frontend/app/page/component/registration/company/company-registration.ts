import {Component, ViewChild} from "@angular/core";
import "rxjs/add/operator/switchMap";
import {Contact} from "../../../../domain/contact/contact";
import {NgForm} from "@angular/forms";
import {RegistrationService} from "../../../../domain/contact/registrationService";
import {FormStatus, Forms} from "../../../../framework/form/forms";

@Component({
    selector: 'company-registration',
    templateUrl: 'company-registration.html',
    styleUrls: ['company-registration.css']
})
export class CompanyRegistrationComponent {

    public contact: Contact = Contact.empty();

    public showExplicitErrorMessage: boolean = false;

    public formStatus = FormStatus;

    public submitStatus: FormStatus = FormStatus.NotSubmitted;

    @ViewChild("registrationForm")
    public ngForm: NgForm;

    constructor(private registrationService: RegistrationService) {

    }

    public onSubmit() {
        this.showExplicitErrorMessage = true;

        if (this.ngForm.form.valid) {
            this.submitStatus = FormStatus.Sent;
            this.registrationService.registerCompany(this.contact).then(this.onSuccess(this)).catch(this.onError(this))
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

    private onSuccess(self: CompanyRegistrationComponent) {
        return () => {
            self.submitStatus = FormStatus.Confirmed;
        }
    }

    private onError(self: CompanyRegistrationComponent) {
        return (error: any) => {
            console.error(error);
            self.submitStatus = FormStatus.Failed;
        }
    }

}
import {Component, ViewChild} from "@angular/core";
import "rxjs/add/operator/switchMap";
import {Contact} from "../../../../domain/contact/contact";
import {NgForm} from "@angular/forms";
import {RegistrationService} from "../../../../domain/contact/registrationService";

@Component({
    selector: 'company-registration',
    templateUrl: 'company-registration.html',
    styleUrls: ['company-registration.css']
})
export class CompanyRegistrationComponent {

    private static SUCCESS_ALERT_CLASS: string = "alert alert-success";

    private static ERROR_ALERT_CLASS: string = "alert alert-danger";

    private static STATUS_NOT_SUBMITTED = "notSubmitted";

    private static STATUS_SENT = "sent";

    private static STATUS_CONFIRMED = "confirmed";

    private static STATUS_FAILED = "failed";

    public contact: Contact = Contact.empty();

    public showExplicitErrorMessage: boolean = false;

    public submitStatus: string = CompanyRegistrationComponent.STATUS_NOT_SUBMITTED;

    public alertClass: string;

    @ViewChild("registrationForm")
    public ngForm: NgForm;

    constructor(private registrationService: RegistrationService) {

    }

    public onSubmit() {
        this.showExplicitErrorMessage = true;

        if (this.ngForm.form.valid) {
            this.submitStatus = CompanyRegistrationComponent.STATUS_SENT;
            this.registrationService.registerCompany(this.contact).then(this.onSuccess(this)).catch(this.onError(this))
        }
    }

    private onSuccess(self: CompanyRegistrationComponent) {
        return () => {
            this.submitStatus = CompanyRegistrationComponent.STATUS_CONFIRMED;
            self.displaySuccessAlert(self).then(() => {
                    self.fadeOutAlert(self).then(() => {
                        self.showExplicitErrorMessage = false;
                        self.ngForm.reset();
                        self.contact = Contact.empty();
                        this.submitStatus = CompanyRegistrationComponent.STATUS_NOT_SUBMITTED;
                    });
                }
            );
        }
    }

    private onError(self: CompanyRegistrationComponent) {
        return (error: any) => {
            console.error(error);
            this.submitStatus = CompanyRegistrationComponent.STATUS_FAILED;
            self.displayErrorAlert(self).then(() => {
                self.fadeOutAlert(self).then(() => {
                    this.submitStatus = CompanyRegistrationComponent.STATUS_NOT_SUBMITTED;
                })
            });
        }
    }

    private displaySuccessAlert(self: CompanyRegistrationComponent) {
        return self.displayAlert(self, CompanyRegistrationComponent.SUCCESS_ALERT_CLASS);
    }

    private displayErrorAlert(self: CompanyRegistrationComponent) {
        return self.displayAlert(self, CompanyRegistrationComponent.ERROR_ALERT_CLASS);
    }

    private displayAlert(self: CompanyRegistrationComponent, alertClass: string) {
        return new Promise((resolve, reject) => {
            self.alertClass = alertClass;
            setTimeout(() => {
                resolve();
            }, 3000);
        });
    }

    private fadeOutAlert(self: CompanyRegistrationComponent) {
        return new Promise((resolve, reject) => {
            self.alertClass += " fade-out";
            setTimeout(() => {
                resolve();
            }, 2000);
        });
    }


}
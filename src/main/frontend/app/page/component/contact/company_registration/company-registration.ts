import {Component} from "@angular/core";
import "rxjs/add/operator/switchMap";
import {Contact} from "../../../../domain/contact/contact";

@Component({
    selector: 'company-registration',
    templateUrl: 'company-registration.html',
    styleUrls: ['company-registration.css']
})
export class CompanyRegistrationComponent {

    public contact: Contact = Contact.empty();

    public showExplicitErrorMessage: boolean  = false;

    constructor() {

    }

    public onSubmit() {
        this.showExplicitErrorMessage = true;
    }
}
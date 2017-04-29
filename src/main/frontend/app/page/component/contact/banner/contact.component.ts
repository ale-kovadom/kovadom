import {Component} from "@angular/core";

@Component({
    selector: 'contact',
    templateUrl: 'contact.html',
    styleUrls: ['contact.css']
})
export class ContactComponent {

    public displayCompanyRegistration: boolean = false;

    public displaySaleRegistration: boolean = false;

    public showCompanyRegistrationDialog() {
        this.displayCompanyRegistration = true;
    }

    public showSaleRegistrationDialog() {
        this.displaySaleRegistration = true;
    }

}

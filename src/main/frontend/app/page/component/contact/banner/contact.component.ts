import {Component} from "@angular/core";

@Component({
    selector: 'contact',
    templateUrl: 'contact.html',
    styleUrls: ['contact.css']
})
export class ContactComponent {

    public displayCompanyRegistration: boolean = false;

    public showCompanyregistrationDialog() {
        this.displayCompanyRegistration = true;
    }

}

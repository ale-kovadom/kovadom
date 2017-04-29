import {Component} from "@angular/core";
import {Location} from "@angular/common";

@Component({
    selector: 'page-not-found',
    templateUrl: 'page-not-found.html',
    styleUrls: ['page-not-found.css']
})
export class PageNotFoundComponent {

    constructor(private location: Location) {
    }

    public back() {
        this.location.back();
    }

}

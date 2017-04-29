import {Component, OnInit} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {Subscription} from "rxjs/Subscription";
import 'rxjs/add/operator/filter';

@Component({
    selector: 'my-app',
    templateUrl: 'kovadom.html',
    styleUrls: ['kovadom.css']
})
export class KovadomComponent implements OnInit {

    private routerSubscription:Subscription;

    constructor(private router:Router) {
    }

    ngOnInit() {
        /*
         * Scroll to the top of the page when user navigates from "page" to "page". 
         */
        this.routerSubscription = this.router.events
            .filter(event => event instanceof NavigationEnd)
            .subscribe(event => {
                document.body.scrollTop = 0;
            });
    }

    ngOnDestroy() {
        this.routerSubscription.unsubscribe();
    }


}

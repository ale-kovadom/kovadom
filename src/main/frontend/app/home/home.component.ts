import {Component} from '@angular/core';
import {HelloWorldService} from "../service/hello-world.service";
import { Router } from '@angular/router';

@Component({
    selector: 'my-app',
    templateUrl: 'home.html',
    styleUrls: [ 'home.css' ]
})
export class HomeComponent {

    name = 'Angular';

    constructor(private helloWorldService:HelloWorldService, private router: Router) {
    }

    ngOnInit(): void {
        this.helloWorldService.getGreeting().then(greeting => this.name = greeting.content.toString());
    }

    gotoDetail(): void {
        this.router.navigate(['/detail', this.name]);
    }
}

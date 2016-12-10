import {Component} from '@angular/core';
import {HelloWorldService} from "../service/hello-world.service";

@Component({
    selector: 'my-app',
    templateUrl: 'my.app.html'
})
export class AppComponent {
    
    name = 'Angular';
    
    constructor(private helloWorldService:HelloWorldService) {
    }

    ngOnInit(): void {
        name = this.helloWorldService.getGreeting().then(greeting => this.name = greeting.content);
    }
}

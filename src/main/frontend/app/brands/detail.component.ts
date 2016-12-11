import {ActivatedRoute, Params} from "@angular/router";
import {Component} from "@angular/core";

// moduleId: module.id,
@Component({
   
    selector: 'app-detail',
    templateUrl: 'detail.html'
})
export class DetailComponent {
    
    value: string;

    constructor(private route:ActivatedRoute) {
    }

    ngOnInit():void {
        this.route.params
            //.switchMap((params:Params) => this.heroService.getHero(+params['id']))
            .subscribe((params:Params) => this.value = params['name']);
    }

}
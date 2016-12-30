declare var Swiper:any;

import {Injectable, Inject, Component, ElementRef, Host, Input} from '@angular/core';

@Injectable()
@Component({
    selector: 'ks-swiper-container',
    templateUrl: 'ui.swiper.html',
    styleUrls: ['ui.swiper.css']
})
export class KSSwiperContainer {

    @Input() options:any;

    @Input() slides:String[];

    swiper:any;

    constructor(@Inject(ElementRef) private elementRef:ElementRef) {
    }

    ngOnInit() {
        const nativeElement = this.elementRef.nativeElement;
        setTimeout(() => {
            var swiperContainer = nativeElement.children[0];
            this.swiper = new Swiper(swiperContainer, this.options);
        });
    }

    update() {
        setTimeout(() => {
            this.swiper.update();
        });
    }

}

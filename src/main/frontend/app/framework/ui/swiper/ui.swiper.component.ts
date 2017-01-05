declare let Swiper: any;

import {Injectable, Inject, Component, ElementRef, Input} from "@angular/core";

@Injectable()
@Component({
    selector: 'swiper-container',
    templateUrl: 'ui.swiper.html',
    styleUrls: ['ui.swiper.css']
})
export class SwiperContainer {

    @Input()
    public options: any;

    @Input()
    public slides: String[];

    public swiper: any;

    constructor(@Inject(ElementRef) private elementRef: ElementRef) {
    }

    public ngOnInit() {
        const nativeElement = this.elementRef.nativeElement;
        setTimeout(() => {
            let swiperContainer = nativeElement.children[0];
            this.swiper = new Swiper(swiperContainer, this.options);
        });
    }

    public update() {
        setTimeout(() => {
            this.swiper.update();
        });
    }

}

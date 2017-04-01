import {Component, OnInit, ViewChild} from "@angular/core";

declare let google: any;

@Component({
    templateUrl: 'gmap.html',
    styleUrls: ['gmap.css']
})
export class TestGmapComponent implements OnInit {

    public options: any;

    public overlays: any[];

    private autocomplete: any;

    @ViewChild('searchTextField')
    public input: any;

    ngOnInit(): void {
        this.options = {
            center: {lat: 36.890257, lng: 30.707417},
            zoom: 12
        };

        this.overlays = [
            // new google.maps.Marker({position: {lat: 36.879466, lng: 30.667648}, title: "Coucou !"})
        ];


    }

    ngAfterViewInit(): void {
        let inputOptions: any = {
            types: ['(cities)'],
            componentRestrictions: {country: 'fr'}
        };
        this.autocomplete = new google.maps.places.Autocomplete(this.input.nativeElement, inputOptions);
        this.autocomplete.addListener('place_changed', this.onAutoCompleteChange(this));
    }

    onAutoCompleteChange(self: any) {
        return (evt: any) => {
            let place = self.autocomplete.getPlace();
            let location = place.geometry.location; //TODO Optim ne demander QUE le place Id
            let placeId = place.place_id; 
            console.info("+++" + placeId);
            console.info("+++" + location);
            self.overlays.push(
                new google.maps.Marker({placeId: placeId, location: location, title: "Coucou !"})
            );
            console.info("+++" + self.overlays);
        }
    }


    public handleOverlayClick(event: any) {
        console.info(event);
        //event.originalEvent: MouseEvent of Google Maps api
        //event.overlay: Clicked overlay
        //event.map: Map instance
    }


}
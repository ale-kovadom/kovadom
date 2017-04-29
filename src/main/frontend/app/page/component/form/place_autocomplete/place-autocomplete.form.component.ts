import {Component, forwardRef, Input, ViewChild} from "@angular/core";
import {NG_VALUE_ACCESSOR, ControlValueAccessor, NG_VALIDATORS, FormControl} from "@angular/forms";
import {Place} from "../../../../domain/place/place";

declare let google: any;

@Component({
    selector: 'place-autocomplete-form',
    templateUrl: 'place-autocomplete.form.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => PlaceAutocompleteComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => PlaceAutocompleteComponent),
            multi: true
        }
    ]
})
export class PlaceAutocompleteComponent implements ControlValueAccessor {

    @Input()
    public elmId: string = "placeId";

    @Input()
    public placeholder: string = "";

    @Input()
    public geolocation: boolean = false;

    public _address: string = "";

    @ViewChild('place')
    public addressInput: any;

    private addressAutocomplete: any;

    private selectedLocation?: Place;


    public ngAfterViewInit(): void {

        let addressInputOptions: any = {
            types: ['address'],
            componentRestrictions: {country: 'fr'}  //TODO i18n
        };
        this.addressAutocomplete = new google.maps.places.Autocomplete(this.addressInput.nativeElement, addressInputOptions);
        this.addressAutocomplete.addListener('place_changed', this.onAutoCompleteChange(this));
        if(this.geolocation) {
            this.geolocate(this.addressAutocomplete);
        }
    }

    onAutoCompleteChange(self: any) {
        return (evt: any) => {
            let place = self.addressAutocomplete.getPlace();
            this.selectedLocation.address = place.formatted_address;
            this.selectedLocation.latitude = place.geometry.location.lat();
            this.selectedLocation.longitude = place.geometry.location.lng();

            this.propagateChange(this.selectedLocation);
        }
    }

    public geolocate(autocomplete: any) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                let geolocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                let circle = new google.maps.Circle({
                    center: geolocation,
                    radius: position.coords.accuracy
                });
                autocomplete.setBounds(circle.getBounds());
            });
        } else {
            console.info("Geolocation disabled by user or not available")
        }
    }


    public propagateChange = (_: any) => {
    };

    public registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    public registerOnTouched() {
    }

    public writeValue(value: Place) {
        this._address = value ? value.address : null;
        this.selectedLocation = value;
    }

    public get address() {
        return this._address;
    }

    public set address(val) {
        // The "selectedLocation" will be overriden by the "onChange" listener of the autocomplete after this method if necessary
        this.selectedLocation = Place.empty();
        this.propagateChange(this.selectedLocation); // Force validation

        this._address = val;
    }

    public validate(c: FormControl) {
        return (this.selectedLocation && this.selectedLocation.address != "") ? null : {
                required: {
                    valid: false
                }
            };
    }

}

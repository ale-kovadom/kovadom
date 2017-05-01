import {Injectable} from "@angular/core";

declare let geolocator: any;

declare let google: any;

@Injectable()
export class GeolocatorService {

    private static init() {
        if (geolocator.config().google.key === "") {
            geolocator.config({
                language: "fr",     //TODO i18n
                google: {
                    version: "3",
                    key: "AIzaSyBPCDRe45TzMKbcf3rwhOv5cvqE5iuQ9VQ"
                }
            });
        }
    }

    private options: any;

    public constructor() {
        GeolocatorService.init();
        this.options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumWait: 5000,     // max wait time for desired accuracy
            maximumAge: 0,         // disable cache
            desiredAccuracy: 10,   // meters
            fallbackToIP: true,    // fallback to IP if Geolocation fails or rejected
            addressLookup: true    // requires Google API key if true
        };
    }

    public geolocate(): Promise<GeoPosition> {
        return new Promise((resolve: any, reject: any) => {
            geolocator.locate(this.options, function (err: any, location: any) {
                err ? reject(err) : resolve(new GeoPosition(location));
            });
        });

    }

}

export class GeoPosition {

    private readonly location: any;

    private readonly latitude: number;

    private readonly longitude: number;

    constructor(location: any) {
        this.location = location;
        this.latitude = location.coords.latitude;
        this.longitude = location.coords.longitude;
    }

    public toGmapCircle(radius?: number) {
        return new google.maps.Circle({
            center: {lat: this.latitude, lng: this.longitude},
            radius: radius || this.location.coords.accuracy
        });
    }

}
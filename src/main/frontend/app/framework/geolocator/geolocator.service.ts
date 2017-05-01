import {Injectable} from "@angular/core";
import {BrowserGlobalContext, GlobalContext} from "../context/NativeGlobalContext";

declare let geolocator: any;

declare let google: any;

declare let window: any;

@Injectable()
export class GeolocatorService {

    private static init(globalContext: GlobalContext) {
        if (geolocator.config().google.key === "") {
            geolocator.config({
                language: globalContext.native.language,
                google: {
                    key: globalContext.native.googleKey
                }
            });
        }
    }

    private options: any;

    public constructor(private globalContext: GlobalContext) {
        GeolocatorService.init(globalContext);
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
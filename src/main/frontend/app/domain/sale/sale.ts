import {Host} from "../host/host";
import moment from 'moment'
import {Place} from "../place/place";
export class Sale {


    public static empty() {
        return new Sale("", SaleStatus.Availability, Place.empty(), Host.empty());
    }

    constructor(public brandCode: String,
                public status: SaleStatus,
                public place: Place,
                public host: Host,
                public stakeholderCount?: Number,
                public extraInformation?: String,
                public date?: Date) {
    }

    public toJSON(): any {
        return {
            brand: this.brandCode,  // The name changes, for server communication.
            status: SaleStatus[this.status], // Name of the status
            place: this.place,
            host: this.host,
            stakeholderCount: this.stakeholderCount,
            extraInformation: this.extraInformation,
            date: moment(this.date).format()
        }
    }


}

export enum SaleStatus {
    Availability,
    BookRequest
}

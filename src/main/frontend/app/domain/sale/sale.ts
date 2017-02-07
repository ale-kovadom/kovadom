import {Host} from "../host/host";
import moment from 'moment'
export class Sale {


    public static empty() {
        return new Sale("", SaleStatus.Availability, "", new Host("", "", "", ""));
    }

    constructor(public brandCode: String,
                public status: SaleStatus,
                public city: String,
                public host: Host,
                public stakeholderCount?: Number,
                public extraInformation?: String,
                public date?: Date) {
    }

    public toJSON(): any {
        return {
            brand: this.brandCode,  // The name changes, for server communication.
            status: SaleStatus[this.status], // Name of the status
            city: this.city,
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

import {Host} from "../host/host";
export class Sale {

    public static empty() {
        return new Sale("", "", new Host("", "", "", ""));
    }

    constructor(public brandCode: String,
                public city: String,
                public host: Host,
                public stakeholderCount?: Number,
                public extraInformation?: String,
                public date?: Date) {
    }

    public toJSON(): any {
        return {
            brand: this.brandCode,  // The name changes, for server communication.
            city: this.city,
            host: this.host,
            stakeholderCount: this.stakeholderCount,
            extraInformation: this.extraInformation,
            date: this.date
        }
    }


}
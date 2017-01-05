import {Host} from "../host/host";
export class Sale {

    constructor(public brandCode: String,
                public city: String,
                public host: Host,
                public stakeholderCount?: Number,
                public extraInformation?: String) {
    }

}
export class Place {

    public static empty() {
        return new Place("");
    }

    constructor(public address: String,
                public latitude?: Number,
                public longitude?: Number) {
    }

}


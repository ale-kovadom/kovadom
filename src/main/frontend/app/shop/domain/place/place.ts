export class Place {

    public static empty() {
        return new Place("");
    }

    constructor(public address: string,
                public latitude?: number,
                public longitude?: number) {
    }

}


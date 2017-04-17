export class Host {

    public static empty() {
        return new Host("", "", "", "");
    }

    constructor(public lastName: String,
                public firstName: String,
                public email: String,
                public phone: String) {
    }

}
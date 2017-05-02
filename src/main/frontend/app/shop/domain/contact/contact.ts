export class Contact {

    static empty() {
        return new Contact("", "", "", "");
    }

    constructor(public lastName: String,
                public firstName: String,
                public email: String,
                public phone: String,
                public company?: String) {
    }
}
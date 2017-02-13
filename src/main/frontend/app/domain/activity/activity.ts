export class Activity {

    public static byLabelComparator(a1:Activity, a2:Activity) {
        if (a1.label > a2.label) {
            return 1;
        }
        if (a1.label < a2.label) {
            return -1;
        }
        return 0;
    };


    constructor(public code:String,
                public label:String,
                public description: String) {
    }

}
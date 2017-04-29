export class Forms {

    public static readonly SUCCESS_ALERT_CLASS: string = "alert alert-success";

    public static readonly ERROR_ALERT_CLASS: string = "alert alert-danger";

}

export enum FormStatus {
    NotSubmitted,
    Sent,
    Confirmed,
    Failed
}

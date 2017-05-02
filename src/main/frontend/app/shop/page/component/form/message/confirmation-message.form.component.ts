import {Component, Input, SimpleChange, Output, EventEmitter} from "@angular/core";
import {FormStatus, Forms} from "../../../../../framework/form/forms";

@Component({
    selector: 'confirmation-message-form',
    templateUrl: 'confirmation-message.form.html',
    styleUrls: ['confirmation-message.form.css']
})
export class ConfirmationMessageEmailComponent {

    public static readonly FADE_OUT_ALERT_CLASS: string = "fade-out";

    public readonly formStatus = FormStatus;

    @Input()
    public status: FormStatus;

    @Output()
    public onDismiss: EventEmitter<any> = new EventEmitter();

    public alertClass: string = "";

    public ngOnChanges(changes: {[ propName: string]: SimpleChange}) {
        let newFormStatus = changes["status"].currentValue;
        if (newFormStatus == FormStatus.Confirmed || newFormStatus == FormStatus.Failed) {
            this.displayAlert(newFormStatus).then(() => this.fadeOutAlert(this)).then(() => this.notifyAlertDismissal());
        } else {
            this.alertClass = "";
        }
    }

    private displayAlert(newStatus: FormStatus) {
        return new Promise((resolve, reject) => {
            if (newStatus == FormStatus.Confirmed) {
                this.alertClass = Forms.SUCCESS_ALERT_CLASS;
            } else if (newStatus == FormStatus.Failed) {
                this.alertClass = Forms.ERROR_ALERT_CLASS;
            }

            setTimeout(() => {
                resolve();
            }, 3000);
        });
    }

    private fadeOutAlert(self: ConfirmationMessageEmailComponent) {
        return new Promise((resolve, reject) => {
            self.alertClass += " " + ConfirmationMessageEmailComponent.FADE_OUT_ALERT_CLASS;
            setTimeout(() => {
                resolve();
            }, 2000);
        });
    }

    private notifyAlertDismissal() {
        this.onDismiss.emit();
    }

}

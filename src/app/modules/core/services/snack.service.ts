import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface SnackConfiguration {
    message: string;
    action?: string;
    options: any;
}

@Injectable({
    providedIn: 'root'
})
export class SnackService {
    private DEFAULT_ACTION: string = 'X';

    constructor(private snack: MatSnackBar) { }

    public open(message: string) {
        const config: SnackConfiguration = {
            message: message,
            options: {
                duration: 3000,
            }
        }
        this.openCustom(config);
    }

    public error(message: string) {
        const config: SnackConfiguration = {
            message: message,
            options: {
                duration: 3000,
                panelClass: ['snack-error']
            }
        }
        this.openCustom(config);
    }

    public openCustom(config: SnackConfiguration) {
        this.snack.open(config.message, config.action ? config.action : this.DEFAULT_ACTION, config.options)
    }

}

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { SettingsService } from '../../core/services';

@Component({
    selector: 'settings',
    templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {
    /*
    POSSIBLE SETTINGS:
        week_count - počet týdnů, které se zobrazují na docházce
        Výběr modulů - bodování, odznaky, pomocník pro hry
    */

    constructor(
        private snack: MatSnackBar,
        private cd: ChangeDetectorRef,
        private dialog: MatDialog,
        private settingsService: SettingsService,
    ) { }

    public ngOnInit() {
    }

}

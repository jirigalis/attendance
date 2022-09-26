import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SettingsService } from '../../core/services';

@Component({
    selector: 'settings',
    templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {

    constructor(
        private snack: MatSnackBar,
        private cd: ChangeDetectorRef,
        private dialog: MatDialog,
        private settingsService: SettingsService,
    ) { }

    public ngOnInit() {
    }

}

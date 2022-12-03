import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { EventService } from '../../core/services/event.service';
import { BasicDialogComponent } from '../../shared/dialog/basic-dialog/basic-dialog.component';
import { EventDialogComponent } from '../event-dialog/event-dialog.component';

@Component({
    selector: 'events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
    displayedColumns: string[] = ['id', 'name', 'startDate', 'endDate', 'description', 'actions'];
    loading = false;
    dataSource;

    constructor(
        private eventService: EventService,
        private snack: MatSnackBar,
        private cd: ChangeDetectorRef,
        private dialog: MatDialog,
    ) { }

    ngOnInit() {
        this.loading = true;
        this.eventService.getAll().subscribe(events => {
            this.dataSource = new MatTableDataSource(events);
            this.loading = false;
        })
    }

    addEvent() {
        const dialogRef = this.dialog.open(EventDialogComponent);

        dialogRef.afterClosed().subscribe((event) => {
            console.log(event);
            if (event) {
                this.loading = true;
                this.eventService.add(event).subscribe((res) => {
                    this.snack.open('Akce vytvořena', 'X', { duration: 3000 });
                    this.refresh();
                    this.loading = false;
                });
            }
        });
    }

    editEvent(event) {
        const dialogRef = this.dialog.open(EventDialogComponent, {
            data: event,
        });
        dialogRef.afterClosed().subscribe((event) => {
            if (event) {
                this.loading = true;
                this.eventService.update(event).subscribe((res) => {
                    this.snack.open('Akce byla aktualizována', 'X', {
                        duration: 3000,
                    });
                    this.refresh();
                    this.loading = false;
                });
            }
        });
    }

    deleteEvent(eventId) {
        const dialogRef = this.dialog.open(BasicDialogComponent);
        dialogRef.afterClosed().subscribe((res) => {
            if (res) {
                this.loading = true;
                this.eventService.delete(eventId).subscribe(() => {
                    this.snack.open('Akce byla odstraněna', 'X', {
                        duration: 3000,
                    });
                    this.refresh();
                    this.loading = false;
                });
            }
        });
    }

    private refresh() {
        this.eventService.getAll().subscribe((res) => {
            this.dataSource.data = res;
        });
        this.cd.detectChanges();
    }

}

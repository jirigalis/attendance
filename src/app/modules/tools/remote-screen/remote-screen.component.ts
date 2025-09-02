import { Component, DestroyRef, inject, OnDestroy, OnInit, signal, WritableSignal } from "@angular/core";
import { RemoteScreenData, RemoteScreenService } from "../../core/services/remote-screen.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { AuthenticationService } from "../../core/authentication/authentication.service";

@Component({
    selector: "remote-screen",
    templateUrl: "./remote-screen.component.html",
    styleUrls: ["./remote-screen.component.scss"],
})
export class RemoteScreenComponent implements OnInit, OnDestroy {
    public resultSig: WritableSignal<RemoteScreenData> = signal(null);
    private interval: any;
    private readonly UPDATE_INTERVAL = 1500;
    private destroyRef = inject(DestroyRef);
    public fontSize = 5;

    constructor(private remoteScreenService: RemoteScreenService, private authService: AuthenticationService) { }

    ngOnInit() {
        const user = this.authService.currentUserValue;
        // check every 1 second for updates
        this.interval = setInterval(() => {
            this.remoteScreenService.checkForUpdates(user.id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res: any) => {
                if (res) {
                    console.log(res.data);
                    this.resultSig.set(res.data);
                }
            });
        }, this.UPDATE_INTERVAL);
    }

    ngOnDestroy() {
        clearInterval(this.interval);
    }
}
import {Component, OnDestroy, OnInit} from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import {RouterOutlet} from "@angular/router";
import {filter, Observable, Subject, takeUntil} from "rxjs";
import {AuthenticationResult, EventMessage, EventType} from "@azure/msal-browser";
import {MsalBroadcastService, MsalService} from "@azure/msal-angular";

@Component({
    selector: 'app-root',
    template: '<router-outlet></router-outlet>',
    standalone: true,
    imports: [RouterOutlet],
    providers: [PrimeNGConfig, MsalService]
})
export class AppComponent implements OnInit, OnDestroy {
    private readonly handleRedirect$: Observable<AuthenticationResult> = this.msalService.handleRedirectObservable()
    private readonly _destroying$ = new Subject<void>();
    constructor(private primengConfig: PrimeNGConfig,
                private msalService: MsalService,
                private msalBroadcastService: MsalBroadcastService,
                ) { }

    ngOnInit() {
        this.primengConfig.ripple = true;
        this.handleRedirect$.pipe(takeUntil(this._destroying$)).subscribe()
        this.msalBroadcastService.msalSubject$
        .pipe(
            filter((msg: EventMessage) => msg.eventType === EventType.ACCOUNT_ADDED || msg.eventType === EventType.ACCOUNT_REMOVED),
        )
        .subscribe((_: EventMessage) => {
            if (this.msalService.instance.getAllAccounts().length === 0) {
                this.msalService.logoutRedirect();
            }
        });
    }

    ngOnDestroy(): void {
        this._destroying$.next(undefined);
        this._destroying$.complete();
    }
}

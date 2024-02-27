import {Component, ElementRef, ViewChild} from '@angular/core';
import { LayoutService } from "../service/app.layout.service";
import {environment} from "../../../environments/environment";
import {NgClass, NgIf} from "@angular/common";
import {MsalService} from "@azure/msal-angular";
import {ButtonModule} from "primeng/button";
import {TooltipModule} from "primeng/tooltip";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    standalone: true,
    imports: [
        NgIf,
        NgClass,
        ButtonModule,
        TooltipModule
    ]
})
export class AppTopBarComponent{

    @ViewChild('menubutton') menuButton!: ElementRef;
    @ViewChild('topbarmenu') menu!: ElementRef;
    protected readonly environment = environment;
    constructor(protected layoutService: LayoutService,
                private msalService: MsalService,) { }

    get isDarkMode(): boolean {
        return this.layoutService.config().theme.includes("dark")
    }

    get isLoggedIn(): boolean {
        return this.msalService.instance.getAllAccounts().length > 0;
    }

    get currentUser(): string {
        if (this.isLoggedIn) {
            return this.msalService.instance
            .getAllAccounts()
            .map((acc) => acc.name )
            .join('|');
        }

        return "Anonymous"
    }

    public logout(): void {
        this.msalService.logoutRedirect();
    }


}

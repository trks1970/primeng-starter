import {Component, ElementRef, ViewChild} from '@angular/core';
import { LayoutService } from "../service/app.layout.service";
import {environment} from "../../../environments/environment";
import {NgClass, NgIf} from "@angular/common";
import {MsalService} from "@azure/msal-angular";
import {ButtonModule} from "primeng/button";
import {TooltipModule} from "primeng/tooltip";
import {FormsModule} from "@angular/forms";
import {MenuItem, PrimeNGConfig} from "primeng/api";
import {SplitButtonModule} from "primeng/splitbutton";
import {TranslocoService} from "@ngneat/transloco";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    standalone: true,
    imports: [
        NgIf,
        NgClass,
        ButtonModule,
        TooltipModule,
        FormsModule,
        SplitButtonModule
    ]
})
export class AppTopBarComponent{
    languages!: MenuItem[];
    @ViewChild('menubutton') menuButton!: ElementRef;
    @ViewChild('topbarmenu') menu!: ElementRef;
    protected readonly environment = environment;

    selectedLanguage: MenuItem

    constructor(protected layoutService: LayoutService,
                private msalService: MsalService,
                private primeNGConfig: PrimeNGConfig,
                private translocoService: TranslocoService,) {

        this.selectedLanguage = {
                title: 'en',
                label: "English",
                icon: 'fi fi-gb',
                escape: false,
                command: () => {
                    this.selectLanguage('en')
                }
            }
        this.languages = [
            this.selectedLanguage,
            {
                title: 'de',
                label: "Deutsch",
                icon: 'fi fi-de',
                command: () => {
                    this.selectLanguage('de')
                }
            },
            {
                title: 'hu',
                label: "Magyar",
                icon: 'fi fi-hu',
                command: () => {
                    this.selectLanguage('hu')
                }
            },
            {
                title: 'al',
                label: "Shqiptare",
                icon: 'fi fi-al',
                command: () => {
                    this.selectLanguage('al')
                }
            }

        ]
    }

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

    selectLanguage(selectedLanguage: string) {
        this.selectedLanguage = this.languages.find( (language) => language.title == selectedLanguage )
        this.translocoService.setActiveLang(selectedLanguage)
        this.translocoService.selectTranslateObject("primeng").subscribe((res) =>
            this.primeNGConfig.setTranslation(res)
        )
    }
}

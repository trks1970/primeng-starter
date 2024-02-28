import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {ButtonModule} from "primeng/button";
import {provideTranslocoScope, TranslocoDirective} from "@ngneat/transloco";

@Component({
    selector: 'app-notfound',
    templateUrl: './notfound.component.html',
  imports: [
    RouterLink,
    ButtonModule,
    TranslocoDirective
  ],
    standalone: true,
    providers: [provideTranslocoScope({scope: 'pages/notfound', alias: 'error'})]
})
export class NotfoundComponent { }

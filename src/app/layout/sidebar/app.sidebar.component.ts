import { Component, ElementRef } from '@angular/core';
import {AppMenuComponent} from "../menu/app.menu.component";

@Component({
    selector: 'app-sidebar',
    templateUrl: './app.sidebar.component.html',
    imports: [
        AppMenuComponent
    ],
    standalone: true
})
export class AppSidebarComponent {
    constructor(public el: ElementRef) { }
}


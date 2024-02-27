import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import {MenuItem} from "primeng/api";
import {LandingMenu} from "../../pages/landing/landing-menu";
import {TakeoffMenu} from "../../pages/takeoff/takeoff-menu";
import {PanelMenuModule} from "primeng/panelmenu";

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
    imports: [
        PanelMenuModule
    ],
    standalone: true
})
export class AppMenuComponent implements OnInit {

    items: MenuItem[] = [];

    constructor() {
    }

    ngOnInit() {
        this.items = [
            LandingMenu,
            TakeoffMenu,
        ]

    }
}

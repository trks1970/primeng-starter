import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {ButtonModule} from "primeng/button";

@Component({
    selector: 'app-notfound',
    templateUrl: './notfound.component.html',
    imports: [
        RouterLink,
        ButtonModule
    ],
    standalone: true
})
export class NotfoundComponent { }

import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {RouterModule} from "@angular/router";

@Component({
    templateUrl: './forbidden.component.html',
    standalone: true,
    imports: [CommonModule, ButtonModule, RouterModule]
})
export class ForbiddenComponent {}

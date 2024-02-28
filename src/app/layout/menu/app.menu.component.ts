import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import {MenuItem} from "primeng/api";
import {TakeoffMenu} from "../../pages/takeoff/takeoff-menu";
import {PanelMenuModule} from "primeng/panelmenu";
import {HomeMenu} from "../../pages/home/home-menu";
import {TranslocoService} from "@ngneat/transloco";
import {filter, first, map} from "rxjs";

const DEFAULT_SCOPE = "default_scope"

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

    private loadMap: Map<string,Map<string,boolean>> = new Map();


    constructor(private translocoService: TranslocoService) {
        // see: https://github.com/jsverse/transloco/issues/461#issuecomment-877168674
        this.translocoService.events$.pipe(
            filter(e => e.type === 'langChanged'),
            map(x => x.payload)
        ).subscribe(({ langName, scope }) => {
            if(this.isTranslationLoaded(langName,scope)){
                this.processMenuTranslation(this.items)
                this.items = [...this.items]
            }
            this.translocoService.events$.pipe(
                filter(e => e.type === 'translationLoadSuccess'),
                map(x => x.payload),
                first()
            ).subscribe(({ langName, scope }) => {
                this.translationLoaded(langName, scope);
                this.processMenuTranslation(this.items)
                this.items = [...this.items]
            });
            }
        );
    }

    ngOnInit() {
        this.items = [
            HomeMenu,
            TakeoffMenu,
            {
                id: 'menu.home',
                icon: "pi pi-fw pi-home",
                routerLink: ["forbidden"],
            }
        ]
        this.processMenuTranslation(this.items)
    }

    private isTranslationLoaded(langName: string, scope: string): Boolean {
        let result = false;
        let scopeMap = this.loadMap[langName]
        if(scopeMap){
            if(Boolean(scope))
                result = scopeMap[scope]
            else
                result = scopeMap[DEFAULT_SCOPE]
        }
        return result

    }

    private translationLoaded(langName: string, scope: string): void {
        let scopeMap = this.loadMap[langName]
        if(!scopeMap){
            scopeMap = new Map()
            this.loadMap[langName] = scopeMap
        }
        if(Boolean(scope))
            scopeMap.set(scope, true);
        else
            scopeMap.set(DEFAULT_SCOPE, false);
    }

    processMenuTranslation(items: MenuItem[]){
        for (let item of items){
            if(item.separator)
                continue;
            item.label = this.translocoService.translate(item.id);
            if(item.items){
                this.processMenuTranslation(item.items);
            }
        }
    }
}

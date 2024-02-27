import {MenuItem} from "primeng/api";

export class AppMenuItem implements MenuItem{

    constructor(private menuItem: MenuItem) {}

    withRouterLink(routerLink: string): MenuItem {
        this.menuItem.routerLink = routerLink
        this.menuItem.routerLinkActiveOptions = {exact: true, path: routerLink};
        return this.menuItem
    }

}

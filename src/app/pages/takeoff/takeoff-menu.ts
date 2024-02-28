import {MenuItem} from "primeng/api";


export const TakeoffMenu: MenuItem = {
    id: 'menu.takeoff.header',
    icon: 'pi pi-fw pi-eject',
    items: [{
        id: 'menu.takeoff.ignite',
        icon: 'pi pi-eject',
        routerLink: ['/takeoff'],
        routerLinkActiveOptions: {exact: true}
    }]
}

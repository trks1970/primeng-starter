import {MenuItem} from "primeng/api";

export const TakeoffMenu: MenuItem = {
    label: 'takeoff.menu',
    icon: 'pi pi-fw pi-eject',
    items: [
        {label: 'takeoff.menu.ignite', icon: 'pi pi-eject', routerLink: ['/takeoff'],routerLinkActiveOptions: {exact: true, path: '/takeoff'}},
    ]
}

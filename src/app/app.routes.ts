import {Routes} from "@angular/router";
import {AppLayoutComponent} from "./layout/app.layout.component";
import {MsalGuard} from "@azure/msal-angular";

export const routes: Routes = [

    {
        path: '', component: AppLayoutComponent, canActivate: [MsalGuard],
        children: [
            { path: '', loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent), canActivate: [MsalGuard] },
            { path: 'takeoff', loadComponent: () => import('./pages/takeoff/take-off.component').then(c => c.TakeOffComponent), canActivate: [MsalGuard] },
        ]
    },
    { path: 'forbidden', loadComponent: () => import('./pages/forbidden/forbidden.component').then((c) => c.ForbiddenComponent) },
    { path: 'notfound', loadComponent: () => import('./pages/notfound/notfound.component').then((c) => c.NotfoundComponent) },
    { path: '**', redirectTo: '/notfound' },
];


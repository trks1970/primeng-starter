import { Routes } from '@angular/router'

export const HOME_PATH = ''
export const ROUTE_BASE_FORBIDDEN = 'forbidden'
export const ROUTE_BASE_NOTFOUND = 'notfound'
export const BASE_ROUTES: Routes = [
  {
    path: ROUTE_BASE_FORBIDDEN,
    loadComponent: () => import('./components/forbidden/forbidden.component').then((c) => c.ForbiddenComponent)
  },
  {
    path: ROUTE_BASE_NOTFOUND,
    loadComponent: () => import('./components/notfound/notfound.component').then((c) => c.NotfoundComponent)
  },
  { path: '**', redirectTo: '/notfound' }
]

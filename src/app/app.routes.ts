import { Routes } from '@angular/router'
import { AppLayoutComponent } from './layout/app.layout.component'
import { MsalGuard } from '@azure/msal-angular'
import { BASE_ROUTES, HOME_PATH } from './features/base/base.routes'
import { ROUTE_PREFIX_MAPPING } from './features/mapping/mapping.routes'
import { ROUTE_CONFIRMATION_CONFIRM_DATA_UPDATE } from './features/confirmation/confirmation.routes'
import { ROUTE_LICENSE_DOCUMENTS_LICENSE_DOCUMENTS } from './features/license-documents/license-documents.routes'

export const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [MsalGuard],
    children: [
      {
        path: HOME_PATH,
        loadComponent: () => import('./features/base/components/home/home.component').then((c) => c.HomeComponent),
        canActivate: [MsalGuard]
      },
      {
        path: ROUTE_PREFIX_MAPPING,
        loadChildren: () => import('./features/mapping/mapping.routes').then((r) => r.MAPPING_ROUTES),
        canActivate: [MsalGuard]
      },
      {
        path: ROUTE_CONFIRMATION_CONFIRM_DATA_UPDATE,
        loadComponent: () => import('./features/confirmation/components/confirm-data-update/confirm-data-update.component').then((c) => c.ConfirmDataUpdateComponent),
        canActivate: [MsalGuard]
      },
      {
        path: ROUTE_LICENSE_DOCUMENTS_LICENSE_DOCUMENTS + '/:uuid',
        loadComponent: () => import('./features/license-documents/components/license-documents/license-documents.component').then((c) => c.LicenseDocumentsComponent),
        canActivate: [MsalGuard]
      }
    ]
  },
  ...BASE_ROUTES
]

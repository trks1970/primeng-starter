import {APP_INITIALIZER, ApplicationConfig, importProvidersFrom, isDevMode} from '@angular/core';
import {
    provideRouter,
    withInMemoryScrolling
} from '@angular/router';

import {
    HTTP_INTERCEPTORS,
    provideHttpClient, withInterceptorsFromDi,

} from '@angular/common/http';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {routes} from './app.routes';
import {ConfirmationService, MessageService} from "primeng/api";
import {
    BrowserCacheLocation, InteractionType,
    IPublicClientApplication,
    LogLevel,
    PublicClientApplication
} from "@azure/msal-browser";
import {
    MSAL_GUARD_CONFIG,
    MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG, MsalBroadcastService, MsalGuard,
    MsalGuardConfiguration,
    MsalInterceptor,
    MsalInterceptorConfiguration, MsalRedirectComponent, MsalService
} from "@azure/msal-angular";
import {LayoutService} from "./layout/service/app.layout.service";
import {securityConfigFactory, SecurityConfigService} from "./services/security-config.service";
import {BASE_PATH} from "../../generated/openapi";
import {provideTransloco} from "@ngneat/transloco";
import {TranslocoHttpLoader} from "./services/transloco-loader";



export function loggerCallback(_: LogLevel, message: string) {
    console.log(message);
}

export function MSALInstanceFactory(securityConfigService: SecurityConfigService): IPublicClientApplication {
    return new PublicClientApplication({
        auth: {
            clientId: securityConfigService.securityConfig.clientId,
            authority: `https://login.microsoftonline.com/${securityConfigService.securityConfig.tenantId}`,
            redirectUri: securityConfigService.securityConfig.redirectURI,
            postLogoutRedirectUri: '/',
        },
        cache: {
            cacheLocation: BrowserCacheLocation.LocalStorage
        },
        system: {
            allowNativeBroker: false,
            loggerOptions: {
                loggerCallback,
                logLevel: LogLevel.Error,
                piiLoggingEnabled: false
            }
        }
    });
}

export function MSALInterceptorConfigFactory(
    securityConfigService: SecurityConfigService,
): MsalInterceptorConfiguration {
    const protectedResourceMap = new Map<string, string[]>();
    protectedResourceMap.set('/', [`${securityConfigService.securityConfig.clientId}/.default`]);
    return {
        interactionType: InteractionType.Redirect,
        protectedResourceMap,
    };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
    return {
        interactionType: InteractionType.Redirect,
        authRequest: {},
        loginFailedRoute: '/forbidden',
    };
}

export function BaseURLFactory(securityConfigService: SecurityConfigService): string {
    return securityConfigService.securityConfig.mappingServiceBaseUrl
}


export const appConfig: ApplicationConfig = {
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: securityConfigFactory,
            deps: [SecurityConfigService],
            multi: true,
        },
        {
            provide: BASE_PATH,
            useFactory: BaseURLFactory,
            deps: [SecurityConfigService]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: MsalInterceptor,
            multi: true,
        },
        {
            provide: MSAL_INSTANCE,
            useFactory: MSALInstanceFactory,
            deps: [SecurityConfigService],
        },
        {
            provide: MSAL_GUARD_CONFIG,
            useFactory: MSALGuardConfigFactory,
        },
        {
            provide: MSAL_INTERCEPTOR_CONFIG,
            useFactory: MSALInterceptorConfigFactory,
            deps: [SecurityConfigService],
        },
        importProvidersFrom(MsalRedirectComponent),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter(routes, withInMemoryScrolling({
            anchorScrolling: 'enabled',
            scrollPositionRestoration: 'enabled'
        })),
        provideTransloco({
            config: {
                availableLangs: ['en','de','hu','al'],
                defaultLang: 'en',
                fallbackLang: 'en',
                reRenderOnLangChange: true,
                prodMode: !isDevMode(),
            },
            loader: TranslocoHttpLoader
        }),
        provideAnimationsAsync(),
        MsalService,
        MsalGuard,
        MsalBroadcastService,
        MessageService,
        ConfirmationService,
        LayoutService,
    ]
};

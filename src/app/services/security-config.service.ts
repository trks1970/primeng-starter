import { Injectable } from '@angular/core';

import { HttpBackend, HttpClient } from '@angular/common/http';
import { catchError, map, type Observable, of } from 'rxjs';
import { type Configuration } from 'generated/openapi';
import {defaultSecurityConfig, SecurityConfig} from "../domain/security-config";

export const securityConfigFactory = (
  securityConfigService: SecurityConfigService,
): (() => Observable<boolean>) => {
  return () => securityConfigService.loadConfig();
};

const CONFIG_PATH = './assets/conf/config.json';

@Injectable({
  providedIn: 'root',
})
export class SecurityConfigService {
  private readonly apiConfiguration: Configuration = {} as Configuration;

  securityConfig!: SecurityConfig;

  private readonly http: HttpClient;

  constructor(handler: HttpBackend) {
    this.http = new HttpClient(handler);
  }

  loadConfig(): Observable<boolean> {

    return this.http.get<SecurityConfig>(CONFIG_PATH).pipe(
      map((securityConfig: SecurityConfig) => {
        this.securityConfig = securityConfig
        // Set baseUrl to api
        this.apiConfiguration.basePath = this.securityConfig.mappingServiceBaseUrl;
        return true;
      }),
      catchError((error) => {
        console.log("error",error)
        this.securityConfig = defaultSecurityConfig;
        console.log(
          'Failed to load config. Default config will be used.',
          error,
        );
       return of(false)
      }),
    );
  }
}

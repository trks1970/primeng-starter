export interface SecurityConfig {
  mappingServiceBaseUrl: string;
  tenantId: string;
  clientId: string;
  redirectURI: string;
}

export const defaultSecurityConfig: SecurityConfig = {
  mappingServiceBaseUrl: '/api',
  tenantId: 'xxx',
  clientId: 'xxx',
  redirectURI: '/',
};

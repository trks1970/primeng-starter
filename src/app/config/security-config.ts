export interface SecurityConfig {
  baseUrl: string
  tenantId: string
  clientId: string
  redirectURI: string
}

export const defaultSecurityConfig: SecurityConfig = {
  baseUrl: '/api',
  tenantId: 'xxx',
  clientId: 'xxx',
  redirectURI: '/'
}

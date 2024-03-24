# MappingServiceFe

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.1.

### Configuration by environment

Configuration can be injected by overwriting `./assets/config.json`. Extend [config.model.ts](src/app/config/config.model.ts) with additional configuration. The `isConfig` function should also be extended accordingly to ensure runtime validity. Also provide defaults for development via `defaultConfig` object and `./assets/config.json` file.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you
change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also
use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Connect to the arvato private feed

See [Azure Artifacts](https://dev.azure.com/arvato-cim/Arvato%20One%20Customer%20ID/_artifacts/feed/arvato-private/connect/npm)

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## How to deploy

Use [pipeline](TODO:link to pipeline) or [Helm](#how-to-deploy-via-helm).

### How to deploy via Helm

1. Make sure to have connectivity to desired cluster. E.g. for share cluster you need a SHH connection
   to `arvato-paas-test-bastion`)
2. Run helm with desired values and namespace.
   E.g. 
```
cd helm
TEST: helm upgrade --install -f ../../mapping-service-infrastructure/applications/test/helm-values.yaml -n app-mediversems-test msfe .
UAT: helm upgrade --install -f ../../mapping-service-infrastructure/applications/uat/helm-values.yaml -n app-mediversems-uat msfe .
PROD: helm upgrade --install -f ../../mapping-service-infrastructure/applications/prod/helm-values.yaml -n app-mediversems-prod msfe .
```

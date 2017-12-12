# Frontend

## Install

1. Install [node](https://nodejs.org/en/) 8.9 or above.

1. Install [Angular](https://angular.io/) globally.
   ```bash
   npm install -g @angular/cli
   ``` 
   
1. Run `npm install` command to install all dependencies.
   
1. Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. 
   The app will automatically reload if you change any of the source files.

## Deploy to [Firebase]
Follow instructions on how to create a Firebase account [here]([Firebase]).

## To Deploy to [Firebase]
1. Update frontend/.firebase.rc `projects.default` variable to your Google project id.

1. Setup OAuth in Google Developers Console. Ensure that http://localhost:4200 and https://goodgames-production.firebaseapp.com are whitelisted.

1. Update frontend/src/environments/environment.prod.ts and frontend/src/environments/environment.ts to point to the GoodGames API endpoint. 
    ```javascript
      export const environment = {
        production: true,
        api_url: 'https://goodgames-production.appspot.com/api',
        google_client_id: GOOGLE_CLIENT_ID
      };
    ```

1. Build production assets. Build fails when building production assets because of google-sigin component. 
   Github [issue](https://github.com/miltador/angular-google-signin/issues/24) reference. An easy workaround is 
   to disable aot checking when deploying to production. However, this still causes issues, so in the mean time
   I have deployed the development version to Firebase. 
    
    ```bash
    # Production
    ng build --prod --aot=false
    # Development -- recommended for now
    ng build
    ```
    The`dist` directory is all that is needed to deploy the `frontend` app to [Firebase].
    
1. Deploy frontend application to [Firebase]. This script also builds the production assets (above). 

    ```bash
    npm run deploy
    ```

1. Visit https://goodgames-production.firebaseapp.com.

## Angular Notes

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

[Firebase]: https://firebase.google.com/docs/hosting/deploying

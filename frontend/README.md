# Frontend

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

## Issues
Unable to build production because of google-sigin component. Github [issue](https://github.com/miltador/angular-google-signin/issues/24) reference.

Workaround is to use this command
  ```bash
  ng build -prod --aot=false
  ```

## Deploy to [Firebase]
Follow instructions on how to create a Firebase account [here]([Firebase]).

## To Deploy to [Firebase]
Update frontend/.firebase.rc `projects.default` variable to your Google project id and then run:

```bash
npm run deploy
```

Visit https://goodgames-185922.firebaseapp.com.

[Firebase]: https://firebase.google.com/docs/hosting/deploying

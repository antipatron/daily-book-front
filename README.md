# Angular 12 Admin & Dashboard Template For Daily book project

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Docker Commands

```bash
# stop all containers 
docker container stop $(docker container ls -aq)

# delete all containers 
docker container rm $(docker container ls -aq)

# Removing dangling images
docker image prune

# Removing all unused images
docker image prune -a

# Removing all unused volumes
docker volume prune

# Removing all unused network
docker network prune

# Eliminar todas las imagenes
docker rmi $(docker images -q)
```



import angular from 'angular';
import uiRouter from 'angular-ui-router';
import heroComponent from './hero.component';

const heroModule = angular
  .module('hero', [
    uiRouter
  ])

  .component('hero', heroComponent)
;

export default heroModule.name;

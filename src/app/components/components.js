import angular from 'angular';
import Home from './home';
import Demos from './demos';

const componentModule = angular
  .module('app.components', [
    Home,
    Demos,
  ])
;

export default componentModule.name;

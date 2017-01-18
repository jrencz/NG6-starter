import angular from 'angular';
import Demos from './demos';
import Home from './home';

const componentModule = angular
  .module('n6s.app.components', [
    Demos,
    Home,
  ])
;

export default componentModule.name;

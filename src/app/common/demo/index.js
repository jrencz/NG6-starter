import angular from 'angular';
import component from './demo.component';

const demoModule = angular
  .module('ng6Starter.demo', [
  ])

  .component('demo', component)
;

export default demoModule.name;

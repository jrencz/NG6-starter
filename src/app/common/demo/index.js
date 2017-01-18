import angular from 'angular';
import component from './demo.component';

const demoModule = angular
  .module('n6s.demo', [
  ])

  .component('demo', component)
;

export default demoModule.name;

import angular from 'angular';
import testStandaloneComponent from './testStandaloneComponent.component';

const testStandaloneComponentModule = angular
  .module('testStandaloneComponent', [
  ])

  .component('testStandaloneComponent', testStandaloneComponent)
;

export default testStandaloneComponentModule.name;

import angular from 'angular';
import testStandaloneComponent from './testStandaloneComponent.component';

const testStandaloneComponentModule = angular
  .module('n6s.testStandaloneComponent', [
  ])

  .component('n6sTestStandaloneComponent', testStandaloneComponent)
;

export default testStandaloneComponentModule.name;

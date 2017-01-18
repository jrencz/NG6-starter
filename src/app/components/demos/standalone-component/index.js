import angular from 'angular';
import component from './standalone-component.component';
import Demo from '../../../common/demo';
import TestStandaloneComponent from '../../../common/testStandaloneComponent';
import uiRouter from 'angular-ui-router';

const standaloneComponentModule = angular
  .module('n6s.demos.standaloneComponent', [
    Demo,
    TestStandaloneComponent,
    uiRouter,
  ])

  .config($stateProvider => {
    'ngInject';

    $stateProvider
      .state('demos.standaloneComponent', {
        url: '/standalone-component',
        component: 'n6sStandaloneComponent',
      });
  })

  .component('n6sStandaloneComponent', component)
;

export default standaloneComponentModule.name;

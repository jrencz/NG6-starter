import angular from 'angular';
import uiRouter from 'angular-ui-router';
import component from './standalone-component.component';

import Demo from '../../../common/demo';
import TestStandaloneComponent from '../../../common/testStandaloneComponent';

const standaloneComponentModule = angular
  .module('ng6Starter.demos.standaloneComponent', [
    Demo,
    TestStandaloneComponent,
    uiRouter,
  ])

  .config((
    $stateProvider
  ) => {
    'ngInject';

    $stateProvider
      .state('demos.standaloneComponent', {
        url: '/standalone-component',
        component: 'standaloneComponent'
      });
  })

  .component('standaloneComponent', component)
;

export default standaloneComponentModule.name;

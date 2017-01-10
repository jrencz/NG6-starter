import angular from 'angular';
import uiRouter from 'angular-ui-router';
import component from './local-vs-external-adapter.component';

import Demo from '../../../common/demo';
import TestStandaloneComponent from '../../../common/testStandaloneComponent';
import TestStandaloneComponentAdapter from 'standalone-component-ng1-adapter';

const localVsExternalAdapterModule = angular
  .module('ng6Starter.demos.localVsExternalAdapter', [
    Demo,
    TestStandaloneComponent,
    TestStandaloneComponentAdapter,
    uiRouter,
  ])

  .config((
    $stateProvider
  ) => {
    'ngInject';

    $stateProvider
      .state('demos.localVsExternalAdapter', {
        url: '/local-vs-external-adapter',
        component: 'localVsExternalAdapter'
      });
  })

  .component('localVsExternalAdapter', component)
;

export default localVsExternalAdapterModule.name;

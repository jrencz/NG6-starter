import angular from 'angular';
import component from './local-vs-external-adapter.component';
import Demo from '../../../common/demo';
import TestStandaloneComponent from '../../../common/testStandaloneComponent';
import TestStandaloneComponentAdapter from 'standalone-component-ng1-adapter';
import uiRouter from 'angular-ui-router';

const localVsExternalAdapterModule = angular
  .module('n6s.demos.localVsExternalAdapter', [
    Demo,
    TestStandaloneComponent,
    TestStandaloneComponentAdapter,
    uiRouter,
  ])

  .config($stateProvider => {
    'ngInject';

    $stateProvider
      .state('demos.localVsExternalAdapter', {
        url: '/local-vs-external-adapter',
        component: 'n6sLocalVsExternalAdapter',
      });
  })

  .component('n6sLocalVsExternalAdapter', component)
;

export default localVsExternalAdapterModule.name;

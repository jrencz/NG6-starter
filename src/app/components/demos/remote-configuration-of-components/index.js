import angular from 'angular';
import uiRouter from 'angular-ui-router';
import component from './remote-configuration-of-components.component';

import Demo from '../../../common/demo';
import TestStandaloneComponent from '../../../common/testStandaloneComponent';

const remoteConfigurationOfComponentsModule = angular
  .module('ng6Starter.demosRemoteConfigurationOfComponents', [
    Demo,
    TestStandaloneComponent,
    uiRouter,
  ])

  .config((
    $stateProvider
  ) => {
    'ngInject';

    $stateProvider
      .state('demos.remoteConfigurationOfComponents', {
        url: '/remote-configuration-of-components',
        component: 'remoteConfigurationOfComponents'
      });
  })

  .component('remoteConfigurationOfComponents', component)
;

export default remoteConfigurationOfComponentsModule.name;

import angular from 'angular';
import component from './remote-configuration-of-components.component';
import Demo from '../../../common/demo';
import TestStandaloneComponent from '../../../common/testStandaloneComponent';
import uiRouter from 'angular-ui-router';

const remoteConfigurationOfComponentsModule = angular
  .module('n6s.demosRemoteConfigurationOfComponents', [
    Demo,
    TestStandaloneComponent,
    uiRouter,
  ])

  .config($stateProvider => {
    'ngInject';

    $stateProvider
      .state('demos.remoteConfigurationOfComponents', {
        url: '/remote-configuration-of-components',
        component: 'n6sRemoteConfigurationOfComponents',
      });
  })

  .component('n6sRemoteConfigurationOfComponents', component)
;

export default remoteConfigurationOfComponentsModule.name;

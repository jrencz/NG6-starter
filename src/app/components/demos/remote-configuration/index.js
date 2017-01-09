import angular from 'angular';
import uiRouter from 'angular-ui-router';
import component from './remote-configuration.component';

import Demo from '../../../common/demo';

const remoteConfigurationModule = angular
  .module('ng6Starter.demos.remoteConfiguration', [
    uiRouter,
    Demo,
  ])

  .config((
    $stateProvider
  ) => {
    'ngInject';

    $stateProvider
      .state('demos.remoteConfiguration', {
        url: '/remote-configuration',
        component: 'remoteConfiguration'
      });
  })

  .component('remoteConfiguration', component)
;

export default remoteConfigurationModule.name;

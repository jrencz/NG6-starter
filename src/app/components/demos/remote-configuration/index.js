import angular from 'angular';
import component from './remote-configuration.component';
import Demo from '../../../common/demo';
import uiRouter from 'angular-ui-router';

const remoteConfigurationModule = angular
  .module('n6s.demos.remoteConfiguration', [
    Demo,
    uiRouter,
  ])

  .config($stateProvider => {
    'ngInject';

    $stateProvider
      .state('demos.remoteConfiguration', {
        url: '/remote-configuration',
        component: 'n6sRemoteConfiguration',
      });
  })

  .component('n6sRemoteConfiguration', component)
;

export default remoteConfigurationModule.name;

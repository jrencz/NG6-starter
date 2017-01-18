import angular from 'angular';
import demosComponent from './demos.component';
import LocalVsExternalAdapter from './local-vs-external-adapter';
import RemoteConfiguration from './remote-configuration';
import RemoteConfigurationOfComponents
  from './remote-configuration-of-components';
import StandaloneComponent from './standalone-component';
import uiRouter from 'angular-ui-router';

const demosModule = angular
  .module('n6s.demos', [
    LocalVsExternalAdapter,
    RemoteConfiguration,
    RemoteConfigurationOfComponents,
    StandaloneComponent,
    uiRouter,
  ])

  .config($stateProvider => {
    'ngInject';

    $stateProvider
      .state('demos', {
        url: '/demos',
        component: 'n6sDemos',
      });
  })

  .component('n6sDemos', demosComponent)
;

export default demosModule.name;

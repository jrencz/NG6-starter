import angular from 'angular';
import uiRouter from 'angular-ui-router';
import demosComponent from './demos.component';

import StandaloneComponent from './standalone-component';
import LocalVsExternalAdapter from './local-vs-external-adapter'
import RemoteConfiguration from './remote-configuration';
import RemoteConfigurationOfComponents
  from './remote-configuration-of-components';

const demosModule = angular
  .module('demos', [
    uiRouter,
    StandaloneComponent,
    LocalVsExternalAdapter,
    RemoteConfiguration,
    RemoteConfigurationOfComponents
  ])

  .config(($stateProvider) => {
    "ngInject";

    $stateProvider
      .state('demos', {
        url: '/demos',
        component: 'demos'
      });
  })

  .component('demos', demosComponent)
;

export default demosModule.name;

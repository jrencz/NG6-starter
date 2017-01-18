import angular from 'angular';
import AppComponent from './app.component';
import Common from './common/common';
import Components from './components/components';
import uiRouter from 'angular-ui-router';

import 'normalize.css';
import 'test-theme';

angular
  .module('n6s.app', [
    Common,
    Components,
    uiRouter,
  ])

  .config($locationProvider => {
    'ngInject';

    // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
    // #how-to-configure-your-server-to-work-with-html5mode
    $locationProvider
      .html5Mode(true)
      .hashPrefix('!');
  })

  .component('n6sApp', AppComponent)
;

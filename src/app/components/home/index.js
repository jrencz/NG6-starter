import angular from 'angular';
import homeComponent from './home.component';
import uiRouter from 'angular-ui-router';

const homeModule = angular
  .module('n6s.home', [
    uiRouter,
  ])

  .config(($stateProvider, $urlRouterProvider) => {
    'ngInject';

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        component: 'n6sHome',
      });
  })

  .component('n6sHome', homeComponent)
;

export default homeModule.name;

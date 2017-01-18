import angular from 'angular';
import navbarComponent from './navbar.component';

const navbarModule = angular
  .module('n6s.navbar', [
  ])

  .component('n6sNavbar', navbarComponent)
;

export default navbarModule.name;

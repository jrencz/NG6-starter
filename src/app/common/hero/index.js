import angular from 'angular';
import heroComponent from './hero.component';

const heroModule = angular
  .module('n6s.hero', [
  ])

  .component('n6sHero', heroComponent)
;

export default heroModule.name;

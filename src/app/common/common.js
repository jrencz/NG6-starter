import angular from 'angular';

import Hero from './hero';
import Navbar from './navbar';
import TestStandaloneComponent from './testStandaloneComponent';
import User from './user';

const commonModule = angular
  .module('n6s.app.common', [
    Hero,
    Navbar,
    TestStandaloneComponent,
    User,
  ])
;

export default commonModule.name;

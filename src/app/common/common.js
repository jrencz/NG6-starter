import angular from 'angular';

import Navbar from './navbar';
import Hero from './hero';
import User from './user';
import TestStandaloneComponent from './testStandaloneComponent';

const commonModule = angular
  .module('app.common', [
    Navbar,
    Hero,
    User,
    TestStandaloneComponent
  ])
;

export default commonModule.name;

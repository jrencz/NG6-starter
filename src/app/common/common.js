import angular from 'angular';
import Navbar from './navbar/navbar';
import Hero from './hero/hero';
import User from './user/user';
import TestStandaloneComponent from './testStandaloneComponent/testStandaloneComponent';

const commonModule = angular
  .module('app.common', [
    Navbar,
    Hero,
    User,
    TestStandaloneComponent
  ])
;

export default commonModule.name;

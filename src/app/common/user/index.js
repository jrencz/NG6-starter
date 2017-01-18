import angular from 'angular';
import UserFactory from './user.factory';

const userModule = angular
  .module('n6s.user', [
  ])

  .factory('User', UserFactory)
;

export default userModule.name;

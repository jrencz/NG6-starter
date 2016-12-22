import template from './navbar.twig';
import controller from './navbar.controller';
import './navbar.scss';

let navbarComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller
};

export default navbarComponent;

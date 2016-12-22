import template from './navbar.twig';
import controller from './navbar.controller';
import './navbar.scss';

const navbarComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller
};

export default navbarComponent;

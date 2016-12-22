import template from './about.twig';
import controller from './about.controller';
import './about.scss';

let aboutComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller
};

export default aboutComponent;

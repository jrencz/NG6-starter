import template from './demo.html';
import controller from './demo.controller';

import './demo.scss';

const component = {
  bindings: {},
  template,
  transclude: {
    descriptionPane: 'descriptionPane',
    demoPane: 'demoPane',
  },
  controller
};

export default component;

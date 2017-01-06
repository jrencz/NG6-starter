import controller from './testStandaloneComponent.controller';
import './testStandaloneComponent.scss'

const testStandaloneComponent = {
  bindings: {
    name: '<',
    onClicked: '&',
  },
  controller
};

export default testStandaloneComponent;

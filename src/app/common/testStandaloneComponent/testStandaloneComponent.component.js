import controller from './testStandaloneComponent.controller';
import './testStandaloneComponent.scss'

const testStandaloneComponent = {
  bindings: {
    name: '<',
    isRightToLeft: '<',
    onClicked: '&',
    delayedOnClicked: '<',
  },
  controller
};

export default testStandaloneComponent;

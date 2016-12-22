import controller from './testStandaloneComponent.controller';

const testStandaloneComponent = {
  restrict: 'E',
  bindings: {
    name: '<',
    onClicked: '&',
  },
  controller
};

export default testStandaloneComponent;

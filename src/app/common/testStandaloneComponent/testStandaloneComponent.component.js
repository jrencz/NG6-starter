import controller from './testStandaloneComponent.controller';

const testStandaloneComponent = {
  bindings: {
    name: '<',
    onClicked: '&',
  },
  controller
};

export default testStandaloneComponent;

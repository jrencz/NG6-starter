import TestStandaloneComponent from 'test-standalone-component';

class TestStandaloneComponentController {
  constructor(
    $element,
    $rootScope
  ) {
    'ngInject';

    // Treating external component as a parent is one way of using it.
    // super('#test-component', config);
    // This way our own controller may name-clash with the wrapped one and that's why it's not a prefereable way.
    // Other may be to call imported function and assign what it returns (the API object) to this controller.
    this.wrappedComponentController = new TestStandaloneComponent($element, {
      // Example input
      name: 'Initial name (set in project)',
      onClicked: () => {
        if (typeof this.onClicked === 'function') {
          // $apply tells Angular something changed. It will always be needed in facades.
          $rootScope.$apply(() => {
            this.onClicked();
          });
        }
      }
    });
  }

  $onInit() {
    // This is the api of external component.
    this.wrappedComponentController.render();
  }

  $onChanges(changes) {
    if ('name' in changes && !changes.name.isFirstChange()) {
      this.wrappedComponentController.changeName(changes.name.currentValue);
    }
  }
}

export default TestStandaloneComponentController;

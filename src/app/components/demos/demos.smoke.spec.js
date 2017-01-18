import DemosModule from './';

import {
  element,
  mock,
} from 'angular';

const {
  inject,
  module,
} = mock;

const {
  beforeEach,
  describe,
  expect,
  it,
} = window;

describe('Component: Demos', () => {
  let $componentController;

  let makeController;

  beforeEach(module(DemosModule));

  beforeEach(inject(_$componentController_ => {
    $componentController = _$componentController_;
  }));

  beforeEach(() => {
    makeController = ({
      locals = {
        $element: element(),
      },
      bindings,
    } = {}) => $componentController(
      'n6sDemos',
      locals,
      bindings
    );
  });

  describe('Controller', () => {
    // Controller specs
    let controller;

    beforeEach(() => {
      controller = makeController();
    });

    // Erase if removing this.name from the controller
    it('has name property after component is initialized', () => {
      expect(controller).not.toHaveMember('name');

      controller.$onInit();

      expect(controller).toHaveMember('name');
    });
  });
});

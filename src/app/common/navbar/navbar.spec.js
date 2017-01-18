import NavbarModule from './';

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

describe('Navbar', () => {
  let $compile;
  let $componentController;
  let $rootScope;

  let makeController;

  beforeEach(module(NavbarModule));

  beforeEach(inject((
    _$compile_,
    _$componentController_,
    _$rootScope_,
  ) => {
    $compile = _$compile_;
    $componentController = _$componentController_;
    $rootScope = _$rootScope_;
  }));

  beforeEach(() => {
    makeController = ({
      locals = {
        $element: element(),
      },
      bindings,
    } = {}) => $componentController(
      'n6sNavbar',
      locals,
      bindings
    );
  });

  describe('Module', () => {
    // Top-level specs: i.e., routes, injection, naming
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

  describe('View', () => {
    // View layer specs.
    let scope;
    let template;

    beforeEach(() => {
      scope = $rootScope.$new();
      template = $compile('<n6s-navbar></n6s-navbar>')(scope);
      scope.$digest();
    });

    it('has home link in template', () => {
      expect(template.find('h1').find('a')).toHaveText('Home');
    });
  });
});

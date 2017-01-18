import HomeModule from './';

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

describe('Home', () => {
  let $compile;
  let $componentController;
  let $location;
  let $rootScope;
  let $state;

  let makeController;

  beforeEach(module(HomeModule));

  beforeEach(inject((
    _$compile_,
    _$componentController_,
    _$location_,
    _$rootScope_,
    _$state_,
  ) => {
    $compile = _$compile_;
    $componentController = _$componentController_;
    $location = _$location_;
    $rootScope = _$rootScope_;
    $state = _$state_;
  }));

  beforeEach(() => {
    makeController = ({
      locals = {
        $element: element(),
      },
      bindings,
    } = {}) => $componentController(
      'n6sHome',
      locals,
      bindings
    );
  });

  describe('Module', () => {
    // Top-level specs: i.e., routes, injection, naming
    it('default component should be n6sHome', () => {
      $location.url('/');
      $rootScope.$digest();
      expect($state.current.component).toBe('n6sHome');
    });
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
      template = $compile('<n6s-home></n6s-home>')(scope);
      scope.$digest();
    });

    it('has name in template', () => {
      expect(template.find('h1').html()).toBe('Found in home.html');
    });

  });
});

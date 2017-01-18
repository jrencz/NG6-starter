import HeroComponent from './hero.component';
import HeroController from './hero.controller';
import HeroModule from './';
import HeroTemplate from './hero.twig';

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

describe('Component: Hero', () => {
  let $componentController;

  let makeController;

  beforeEach(module(HeroModule));
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
      'n6sHero',
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

  describe('Template', () => {
    // Template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has name in template [REMOVE]', () => {
      expect(HeroTemplate).toMatch(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
    // Component/directive specs
    const component = HeroComponent;

    it('includes the intended template', () => {
      expect(component.template).toBe(HeroTemplate);
    });

    it('invokes the right controller', () => {
      expect(component.controller).toBe(HeroController);
    });
  });
});

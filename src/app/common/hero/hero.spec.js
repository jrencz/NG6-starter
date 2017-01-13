import HeroModule from './'
import HeroController from './hero.controller';
import HeroComponent from './hero.component';
import HeroTemplate from './hero.twig';

describe('Hero', () => {
  let $rootScope, makeController;

  beforeEach(window.module(HeroModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new HeroController();
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    it('has a name property [REMOVE]', () => { // erase if removing this.name from the controller
      let controller = makeController();
      expect(controller).toHaveMember('name');
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has name in template [REMOVE]', () => {
      expect(HeroTemplate).toMatch(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = HeroComponent;

      it('includes the intended template',() => {
        expect(component.template).toBe(HeroTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).toBe(HeroController);
      });
  });
});
